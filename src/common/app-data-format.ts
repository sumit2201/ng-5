export class AppData {
    public table: TabularData;
    constructor() {
        this.table = new TabularData();
    }
}

class TabularData {
    public rows: RowData[];
    public columns: ColumnData[];
    constructor() {
        this.rows = [];
        this.columns = [];
    }
}

export class RowData {
    public value: any;
    public actualValue: any;
    public columnObj: ColumnData;
}

export class ColumnData {
    public id: string;
    public title: string;
    public dataType: string;
    public isVisible: boolean;
}
