export class AppDataParent {
    public table: TabularData;
    constructor() {
        this.table = new TabularData();
    }
}

class TabularData {
    public rows: TableRowFormat[];
    public columns: TableColumnFormat;
    constructor() {
        this.rows = [];
        this.columns = {};
    }
}

export type TableRowFormat  = {[key:string]:TableRow};
export type TableColumnFormat  = {[key:string]:TableColumn};

export class TableRow {
    public value: any;
    public actualValue: any;
    public columnObj: TableColumn;
}

export class TableColumn {
    public columnId: string;
    public title: string;
    public dataType: string;
    public isVisible: boolean;
}
