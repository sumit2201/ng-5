import {
    Component,
    OnInit,
    Input,
    OnChanges,
    SimpleChanges,
    SimpleChange
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";
import { LoggerService } from "../../../services/log-provider.service";
import { DataProviderService } from "../../../services/data-provider.service";
import { Validations } from "../../../common/utility";
import { LogTypes, IWidgetInfo } from "../../../common/interfaces";

@Component({
    templateUrl: "./rich-table.template.html",
})
export class RichTableComponent implements OnInit, OnChanges {
    @Input() private widgetData: IWidgetInfo;
    constructor(
        public route: ActivatedRoute, private logger: LoggerService, private global: Globals
    ) {
    }

    public ngOnInit() {
        console.error("data recieved in component");
        console.error(this.widgetData);
    }

    public ngOnChanges(changes: SimpleChanges) {
        console.error("data recieved in change");
        const name: SimpleChange = changes.name;
        console.log("prev value: ", name.previousValue);
        console.log("got name: ", name.currentValue);
    }

}
