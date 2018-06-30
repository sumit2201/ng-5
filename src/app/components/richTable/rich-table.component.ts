import {
    Component,
    OnInit,
    Input
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
export class RichTableComponent implements OnInit {
    @Input() private widgetData: IWidgetInfo;
    constructor(
        public route: ActivatedRoute, private logger: LoggerService, private dataProvider: DataProviderService, private global: Globals
    ) {
    }

    public ngOnInit() {
        this.loadData();
    }

    private loadData() {
        if (!Validations.isNullOrUndefined(this.widgetData)) {
            const data = this.dataProvider.getData(this.widgetData.dataProvider);
            if (!Validations.isNullOrUndefined(data)) {
                data.subscribe((res: any) => {
                    console.error(res);
                }, () => {
                    this.logger.logMessage("error in fetching data in rich table component after load data call", LogTypes.Error);
                });
            } else {
                this.logger.logMessage("no data found in rich table component after load data call", LogTypes.Error);
                this.logger.logMessage(this.widgetData.dataProvider, LogTypes.Error);
            }
        } else {
            this.logger.logMessage("no widget data found in rich table component in load data", LogTypes.Error);
        }
    }

}
