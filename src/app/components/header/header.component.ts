import {
    Component,
    OnInit,
    Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { STATICWIDGETS } from "../../../config/static-widget-info";
import { IWidgetInfo } from "../../../common/interfaces";

@Component({
    selector: "app-header",
    templateUrl: "./header.template.html",
    styleUrls: ["./header.style.scss"],
})
export class HeaderComponent implements OnInit {
    @Input() public heading: any;
    public localState: any;
    private staticWidgets: IWidgetToggleInfo[] = [];
    constructor(
        public route: ActivatedRoute
    ) {
    }

    public ngOnInit() {
        this.prepareStaticWidgets();
    }

    private prepareStaticWidgets() {
        const settings = {
            label: "Sign In",
            widget: STATICWIDGETS["LOGIN"]
        };
        this.staticWidgets.push(settings as IWidgetToggleInfo);
    }
}

export interface IWidgetToggleInfo {
    label: string;
    widget: IWidgetInfo;
}
