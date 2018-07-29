import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { IActionInfo, ActionTypes, IParameterValueFormat, IActionParameter, LogTypes } from "../common/interfaces";
import { Observer, Observable } from "rxjs";
import { tap, flatMap } from "rxjs/operators";
import { LoggerService } from "./log-provider.service";

@Injectable()
export class DataTransformationService {
  constructor(private http: HttpClient, private global: Globals, private logger: LoggerService) {

  }

  public transformData(httpData: any) {
        const simpleObservable = new Observable((observer) => {
        
            // observable execution
            observer.next(httpData);
            observer.complete()
        });
        return simpleObservable;
    }
}
