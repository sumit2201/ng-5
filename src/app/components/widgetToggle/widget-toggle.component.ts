import { OnInit, Input, Component } from "@angular/core";
import { IWidgetInfo, IWidgetToggleSettings } from "../../../common/interfaces";

@Component({
    selector: "app-widget-toggle",
    templateUrl: "./widget-toggle.template.html",
})

export class WidgetToggleComponent implements OnInit {
    @Input() private settings: IWidgetToggleSettings;
    public ngOnInit() {
        // TODO:
        console.error(this.settings);
    }
}
