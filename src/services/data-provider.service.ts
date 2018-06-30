import { HttpClient } from "@angular/common/http";
import { Injectable, ComponentFactoryResolver } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { RichTableComponent } from "../app/components/richTable/rich-table.component";
import { FormLoaderComponent } from "../app/components/formLoader/form-loader.component";
import { IActionInfo, ActionTypes } from "../common/interfaces";
import { Observer, Observable } from "rxjs";

@Injectable()
export class DataProviderService {
  constructor(private http: HttpClient, private global: Globals, private componentFactoryResolver:
    ComponentFactoryResolver) {

  }

  public getData(actionInfo: IActionInfo) {
    let data: Observable<Object> = null;
    switch (actionInfo.type) {
      case ActionTypes.Rest:
        data = this.getDataFromRestCall(actionInfo);
        break;
      default:
        break;
    }
    return data;
  }

  private getDataFromRestCall(actionInfo: IActionInfo) {
    return this.http.get(actionInfo.dev_url);
  }
}
