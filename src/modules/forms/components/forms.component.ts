import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from "@angular/core";

@Component({
    selector: "my-form",
    templateUrl: "./forms.template.html",
})
export class FormsComponent implements OnChanges {
    public isClicked = false;
    public newItem = null;
    @Input() public schema: any = null;
    @Input() public model: any = null;
    public items = [{ name: "Sumit" }, { name: "Neema" }];
    private _schema: any = null;
    private _model: any = null;
    public onFormSubmit(data: any) {
        console.error(data);
    }

    // public ngOnChanges(changes: SimpleChanges) {
    //     this._schema = changes.schema.currentValue;
    //     this._model = changes.model.currentValue;
    // }

    public showInput() {
        this.isClicked = true;
    }

    public updateList() {
        const itemObj = {
            name: this.newItem,
        };
        this.items.push(itemObj);
        this.isClicked = false;
    }
}
