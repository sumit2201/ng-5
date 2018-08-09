class AppData {
    public table: TabularData;
}

class TabularData {
    private rows: RowData[];
    private columns: ColumnData[];
}

class RowData {

}

class ColumnData {
    // TODO
    public id: string;
    public title: string;
    public dataType: string;
    public isVisible: boolean;
}
