// globals.ts
import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {

    public logMessage(msg: string, type: string) {
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

export const LogTypes = {
    Error: "ERROR",
    Info: "INFO",
}

