import { OnInit, Input, Component } from "@angular/core";
import { IWidgetInfo, IWidgetToggleSettings } from "../../../common/interfaces";

@Component({
    selector: "app-widget-toggle",
    templateUrl: "./widget-toggle.template.html",
})

export class WidgetToggleComponent implements OnInit {
    @Input() private settings: IWidgetToggleSettings;
    private isActive: boolean;

    constructor() {
        this.isActive = false;
    }
    public ngOnInit() {
        // TODO:
        console.error(this.settings);
    }

    public handleEventForToggle(){
        this.isActive = true;
    }
}
