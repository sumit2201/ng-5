import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "field-builder",
  templateUrl: "./field-builder.template.html",
})
export class FieldBuilderComponent implements OnInit {
  @Input() private field: any;
  @Input() private form: any;

  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() {
    // TODO:
  }

  public ngOnInit() {
    // TODO:
  }

}
