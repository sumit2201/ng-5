// globals.ts
import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    public API_URLS = {
        SampleForm: "./config/sample-form.json",
        SampleData: "./config/sample-data.json",
        TeamPageWidgets:"./config/team-profile.widgets.json",
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
