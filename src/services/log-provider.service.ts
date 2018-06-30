// globals.ts
import { Injectable } from "@angular/core";
import { LogTypes } from "../common/interfaces";
@Injectable()
export class LoggerService {
    public logMessage(msg: any, type: string) {
        switch (type) {
            case LogTypes.Error:
                console.error(msg);
                break;
            case LogTypes.Info:
                console.info(msg);
                break;
            default:
                console.error(msg);
                break;
        }
    }
}
