import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { IActionInfo, ActionTypes, IParameterValueFormat, IActionParameter, LogTypes } from "../common/interfaces";
import { Observer, Observable } from "rxjs";
import { tap, flatMap } from "rxjs/operators";
import { DataTransformationService } from "./data-transformation.service";
import { LoggerService } from "./log-provider.service";

@Injectable()
export class DataProviderService {
  constructor(private http: HttpClient, private global: Globals, private logger: LoggerService, private dataTransformer:
    DataTransformationService) {

  }

  public performAction(actionInfo: IActionInfo, parameters: IParameterValueFormat, metaType?: string) {
    let dataObserver: Observable<Object> = null;
    switch (actionInfo.type.toUpperCase()) {
      case ActionTypes.Rest:
        dataObserver = this.performRestOperation(actionInfo, parameters, metaType);
        break;
      case ActionTypes.InlineData:
        dataObserver = this.getInlineData(actionInfo, parameters, metaType);
        break;
      default:
        break;
    }
    return dataObserver;
  }

  private getInlineData(actionInfo: IActionInfo, parametersValues: IParameterValueFormat, metaType: string) {
    return new Observable((observer) => {
      observer.next(actionInfo.data);
      observer.complete();
    });
  }

  private performRestOperation(actionInfo: IActionInfo, parametersValues: IParameterValueFormat, metaType?: string) {
    let dataObserver: Observable<Object> = null;
    switch (actionInfo.method) {
      case "get":
        dataObserver = this.getDataFromRestCall(actionInfo, parametersValues, metaType);
        break;
      case "post":
        break;
      default:
        break;
    }
    return dataObserver;
  }

  private getDataFromRestCall(actionInfo: IActionInfo, parametersValues: IParameterValueFormat, metaType: string) {
    const requestParams = this.prepareRequestParams(actionInfo.parameters, parametersValues);
    return this.http.get(actionInfo.dev_url, {
      params: requestParams,
    }).pipe(
      flatMap((httpData: any) => {
        if (!Validations.isNullOrUndefined(httpData) && !Validations.isArray(httpData)) {
          httpData = [httpData];
        }
        return this.dataTransformer.transformData(httpData, metaType);
      })
    );
  }

  private postDataFromRestCall(actionInfo: IActionInfo, parametersValues: IParameterValueFormat, metaType: string) {
    const requestParams = this.prepareRequestParams(actionInfo.parameters, parametersValues);
    return this.http.post(actionInfo.dev_url, {
      params: requestParams,
    }).pipe(
      flatMap((httpData: any) => {
        if (!Validations.isNullOrUndefined(httpData) && !Validations.isArray(httpData)) {
          httpData = [httpData];
        }
        return this.dataTransformer.transformData(httpData, metaType);
      })
    );
  }

  private prepareRequestParams(parameters: IActionParameter[], parametersValues: IParameterValueFormat) {
    const requestParams: IParameterValueFormat = {};
    if (!Validations.isNullOrUndefined(parameters)) {
      for (const parameter of parameters) {
        if (!Validations.isNullOrUndefined(parametersValues[parameter.id])) {
          requestParams[parameter.id] = parametersValues[parameter.id];
        } else if (parameter.isMendatory) { // TODO add another else if to fill parameter from system values i.e user id , authontication token
          this.logger.logMessage("Mendatory parameter is not provided for rest call: " + parameter.id + " parameters" + parametersValues, LogTypes.Error);
        }
      }
    }
    return requestParams;
  }
}
