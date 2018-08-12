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
import { AppDataParent, TableColumn } from '../../../common/app-data-format';

@Component({
    templateUrl: "./rich-table.template.html",
})
export class RichTableComponent implements OnInit, OnChanges {
    @Input() private widgetData: AppDataParent;
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
        this.prepareNgTableData(this.widgetData);
    }

    public ngOnChanges(changes: SimpleChanges) {
        console.error("data recieved in change");
        const name: SimpleChange = changes.name;
        console.log("prev value: ", name.previousValue);
        console.log("got name: ", name.currentValue);
    }

    private prepareNgTableData(data: AppDataParent) {
        const columns = this.prepareColumnsForNgTable(data);
        const rows = this.prepareRowsForNgTable(data, columns);
        if (!Validations.isNullOrUndefined(columns) && !Validations.isNullOrUndefined(rows)) {
            const settings = {
                columns,
                actions: {
                    add: false,
                    edit: false,
                    delete: false,
                },
                editable: false,
                filter: {}
            }
            this.settings = settings;

            this.rows = rows;
        } else {
            this.logger.logError("No data is created for table" + data);
        }
    }

    private prepareColumnsForNgTable(data: AppDataParent) {
        // this wrapper is only written for a new reference and dis joint column structure in transformation and in ng2 smart table, both structure may change 
        const tableColummns: { [key: string]: any } = {};
        const columns = data.table.columns;
        if (!Validations.isNullOrUndefined(columns) && !Validations.isObjectEmpty(columns)) {
            for (const columnId in columns) {
                if (columns.hasOwnProperty(columnId)) {
                    const columnDetail = columns[columnId];
                    const columnObj = {} as any;
                    columnObj.title = columnObj.title;
                    tableColummns[columnDetail.columnId] = columnDetail;
                }
            }
            return tableColummns;
        } else {
            this.logger.logMessage("columns were not found in data", LogTypes.Error);
            this.logger.logMessage(data, LogTypes.Error);
        }
    }

    private prepareRowsForNgTable(data: AppDataParent, columns: { [key: string]: any }) {
        const tableRows: any[] = [];
        const rows = data.table.rows;
        if (!Validations.isNullOrUndefined(rows)) {
            if (rows.length > 0) {
                for (const row of rows) {
                    const rowObj = {};
                    for (const columnId in columns) {
                        if (columns.hasOwnProperty(columnId) && !Validations.isNullOrUndefined(row[columnId])) {
                            rowObj[columnId] = row[columnId].value;
                        }
                    }
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
