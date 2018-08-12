import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RootScopeService } from "./rootscope-provider.service";
import { Globals, WidgetTypes } from "../common/global";
import { Validations } from "../common/utility";
import { IActionInfo, ActionTypes, IParameterValueFormat, IActionParameter, LogTypes, IMetaInfoFormat } from "../common/interfaces";
import { Observer, Observable } from "rxjs";
import { tap, flatMap, catchError } from "rxjs/operators";
import { LoggerService } from "./log-provider.service";
import { MetaProviderService } from "./meta-provider.service";
import { AppData, RowData } from "../../../common/app-data-format";
import { TableRow, AppDataParent, TableColumn, TableColumnFormat } from '../common/app-data-format';

@Injectable()
export class DataTransformationService {
    constructor(private http: HttpClient, private global: Globals, private logger: LoggerService, private metaProvider: MetaProviderService) {

    }

    public transformData(httpData: any, metaType: string) {
        // const metaObservable = this.metaProvider.getMetaInfo(metaType);
        return this.metaProvider.getMetaInfo(metaType).pipe(
            catchError((err: any) => {
                return new Observable((observer) => {
                    observer.next({});
                    observer.complete();
                    this.logger.logError("Meta info is not recived for meta type" + metaType);
                    this.logger.logError(err);
                });
            }),
            flatMap((metaInfo: any) => {
                return this.prepareTransformData(httpData, metaInfo);
            }),
        );
    }

    private prepareTransformData(dataArr: any, metaInfo: IMetaInfoFormat) {
        return new Observable((observer) => {
            const appDataObj = new AppDataParent();
            const columns = this.prepareColumns(metaInfo, dataArr);
            appDataObj.table.columns = columns;
            const rows = this.prepareRows(columns, dataArr);
            appDataObj.table.rows = rows;
            observer.next(appDataObj);
            observer.complete();
        });
    }

    private prepareColumns(metaInfo: any, dataArr: any[]) {
        const columns: TableColumnFormat = {};
        if (!Validations.isNullOrUndefined(metaInfo) && !Validations.isNullOrUndefined(metaInfo.columns)) {
            for (const columnId in metaInfo.columns) {
                if (metaInfo.columns.hasOwnProperty(columnId)) {
                    const columnInfo = metaInfo.columns[columnId];
                    columnInfo.columnId = columnId;
                    columns[columnId] = columnInfo;
                }
            }
        } else {
            this.logger.logInfo("Columns not found in meta info" + metaInfo);
        }
        return columns;
    }

    private prepareRows(columns: TableColumnFormat, dataArr: any[]) {
        const rows = [];
        if (!Validations.isNullOrUndefined(dataArr) && dataArr.length > 0) {
            for (const dataObj of dataArr) {
                const rowObj = [];
                for (const columnId in columns) {
                    if (columns.hasOwnProperty(columnId)) {
                        if (!Validations.isNullOrUndefined(dataObj[columnId])) {
                            const rowData = {} as TableRow;
                            rowData.value = dataObj[columnId];
                            rowData.actualValue = dataObj[columnId];
                            rowData.columnObj = columns[columnId];
                            rowObj[columnId] = rowData;
                        } else {
                            delete columns[columnId];
                        }
                    }
                }
                if (!Validations.isObjectEmpty(rowObj)) {
                    rows.push(rowObj);
                } else {
                    this.logger.logInfo("no compatible data found in row creation for data in transformation" + dataObj);
                }
            }
        } else {
            this.logger.logMessage("data is not valid for row conversion", LogTypes.Error);
            this.logger.logMessage(dataArr, LogTypes.Error);
        }
        return rows;
    }
}
