import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "checkbox",
  templateUrl: "./checkbox-input.template.html",
})
export class CheckBoxComponent {
  @Input() private field: any = {};
  @Input() private form: FormGroup;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
}