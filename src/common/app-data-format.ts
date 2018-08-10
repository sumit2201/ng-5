export class AppData {
    public table: TabularData;
}

class TabularData {
    public rows: RowData[];
    public columns: ColumnData[];
}

class RowData {
    public value: any;
    public actualValue: any;
    public columnObj: ColumnData;
}

class ColumnData {
    public id: string;
    public title: string;
    public dataType: string;
    public isVisible: boolean;
}
