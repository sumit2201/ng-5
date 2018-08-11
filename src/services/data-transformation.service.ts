import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { IActionInfo, ActionTypes, IParameterValueFormat, IActionParameter, LogTypes, IMetaInfoFormat } from "../common/interfaces";
import { Observer, Observable } from "rxjs";
import { tap, flatMap } from "rxjs/operators";
import { LoggerService } from "./log-provider.service";
import { MetaProviderService } from "./meta-provider.service";

@Injectable()
export class DataTransformationService {
    constructor(private http: HttpClient, private global: Globals, private logger: LoggerService, private metaProvider: MetaProviderService) {

    }

    public transformData(httpData: any, metaType: string){
        const simpleObservable = new Observable((observer) => {
            const metaObservable = this.metaProvider.getMetaInfo(metaType);
            metaObservable.subscribe((metaInfo: IMetaInfoFormat) => {
                const simpleObservable = new Observable((observer) => {
                    // observable execution
                    const transformedData = this.prepareTransformData(httpData, metaInfo);
                    observer.next(transformedData);
                    observer.complete();
                });
            }, (err) => {
                observer.next([]);
                observer.complete();
                this.logger.logMessage("Meta info is not recived for meta type" + metaType, LogTypes.Error);
                this.logger.logMessage(err, LogTypes.Error);
            });
        });
        return simpleObservable;
    }

    private prepareTransformData(data: any, metaInfo: IMetaInfoFormat) {
        return data;
    }

}
