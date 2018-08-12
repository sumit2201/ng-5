import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Globals } from "../common/global";
import { Validations } from "../common/utility";
import { LogTypes } from "../common/interfaces";
import { Observer, Observable } from "rxjs";
import { LoggerService } from "./log-provider.service";

@Injectable()
export class MetaProviderService {
    private cachedMetaInfo: { [key: string]: any } = {};
    constructor(private http: HttpClient, private global: Globals, private logger: LoggerService) {

    }

    private getMetaURLFromType(type: string) {
        const metaType = type.toLowerCase();
        const url = "./config/metaInfo/" + metaType + "-meta.json";
        return url;
    }

    public getMetaInfo(metaType: string): Observable<object> {
        let metaInfoObservable;
        if (!Validations.isNullOrUndefined(this.cachedMetaInfo[metaType])) {
            metaInfoObservable = new Observable((observer) => {
                // observable execution
                observer.next(this.cachedMetaInfo[metaType]);
                observer.complete();
            });
            return metaInfoObservable;
        }
        else {
            if (Validations.isNullOrUndefined(metaType)) {
                this.logger.logMessage("metaType is not defined hence returning empty", LogTypes.Error);
                return metaInfoObservable = new Observable((observer) => {
                    // observable execution
                    observer.next(null);
                    observer.complete();
                });
            } else {
                const metaURL = this.getMetaURLFromType(metaType);
                return this.http.get(metaURL);
            }
        }
    }

}
