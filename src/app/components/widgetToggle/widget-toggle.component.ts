import { OnInit, Input, Component, ElementRef } from "@angular/core";
import { IWidgetInfo, IWidgetToggleSettings } from "../../../common/interfaces";
import { UIHelper } from "../../../common/utility";

@Component({
    selector: "app-widget-toggle",
    templateUrl: "./widget-toggle.template.html",
})

export class WidgetToggleComponent implements OnInit {
    @Input() private settings: IWidgetToggleSettings;
    private isActive: boolean;

    constructor(private elementRef: ElementRef) {
        this.isActive = false;
    }
    public ngOnInit() {
        // TODO:
        console.error(this.settings);
    }

    public handleEventForToggle($event: MouseEvent, settings: IWidgetToggleSettings) {
        const targetElement = this.getTargetElementForToggle($event);
        const elementPosToOpen = UIHelper.getAbsoluteCoordsForElement(targetElement);
        const elementToOpen = $(this.elementRef).find(".app-toggle-place") as any;
        const positionToOpen = UIHelper.adjustPositionAsPerWindow(elementPosToOpen, elementToOpen);
        UIHelper.setPosition(positionToOpen, elementToOpen);
        this.isActive = true;
    }

    private getTargetElementForToggle($event: MouseEvent) {
        return $($event.target) as JQuery;
    }
}
