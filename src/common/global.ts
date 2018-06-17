// globals.ts
import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    public API_URLS = {
        SampleForm: "./config/sampleform.json",
        SampleWidgets: "./config/sampleWidgets.json",
    };
}

export interface IWidgetItem {
    name: string;
    type: string;
}

export const WidgetTypes = {
    Form: "form",
    RichTable: "richTable",
}
