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
import { LogTypes } from "../../../common/interfaces";
import { AppData } from "../../../common/app-data-format";

@Component({
    templateUrl: "./rich-table.template.html",
})
export class RichTableComponent implements OnInit, OnChanges {
    @Input() private widgetData: AppData;
    private settings: any;
    private rows: any[];
    constructor(
        public route: ActivatedRoute, private logger: LoggerService, private global: Globals
    ) {
        this.loadSetttings();
    }

    public loadSetttings() {
        const settings = {
            columns: {
                id: {
                    title: "ID"
                },
                name: {
                    title: "Full Name"
                },
                username: {
                    title: "User Name"
                },
                email: {
                    title: "Email"
                }
            }
        };
        return settings;
    }

    public ngOnInit() {
        console.error("data recieved in component");
        console.error(this.widgetData);
        // this.prepareNgTableData(this.widgetData);
    }

    public ngOnChanges(changes: SimpleChanges) {
        console.error("data recieved in change");
        const name: SimpleChange = changes.name;
        console.log("prev value: ", name.previousValue);
        console.log("got name: ", name.currentValue);
    }

    private prepareNgTableData(data: AppData) {
        const columns = this.prepareColumnsForNgTable(data);
        const rows = this.prepareRowsForNgTable(data);
        if (!Validations.isNullOrUndefined(columns) && !Validations.isNullOrUndefined(rows)) {
            const settings = {} as any;
            settings.columns = columns;
            this.settings = settings;
            this.rows = rows;
        }
    }

    private prepareColumnsForNgTable(data: AppData) {
        const tableColummns: { [key: string]: any } = {};
        const columns = data.table.columns;
        if (!Validations.isNullOrUndefined(columns)) {
            if (columns.length > 0) {
                for (const column of columns) {
                    const columnObj = {} as any;
                    columnObj.title = column.title;
                    tableColummns[column.id] = columnObj;
                }
                return tableColummns;
            } else {
                this.logger.logMessage("columns were not found in data", LogTypes.Error);
                this.logger.logMessage(data, LogTypes.Error);
            }
        } else {
            this.logger.logMessage("columns were not found in data", LogTypes.Error);
            this.logger.logMessage(data, LogTypes.Error);
        }
    }

    private prepareRowsForNgTable(data: AppData) {
        const tableRows: any[] = [];
        const rows = data.table.rows;
        if (!Validations.isNullOrUndefined(rows)) {
            if (rows.length > 0) {
                for (const row of rows) {
                    const rowObj = {} as any;
                    rowObj[row.columnObj.id] = row.value;
                    tableRows.push(rowObj);
                }
                return tableRows;
            } else {
                this.logger.logMessage("rows were not found in data", LogTypes.Error);
                this.logger.logMessage(data, LogTypes.Error);
            }
        } else {
            this.logger.logMessage("rows were not found in data", LogTypes.Error);
            this.logger.logMessage(data, LogTypes.Error);
        }
    }

}
