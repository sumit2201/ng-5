import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

// text,email,tel,textarea,password, 
@Component({
  selector: "textbox",
  templateUrl: "./textbox-input.template.html",
})
export class TextBoxComponent {
  @Input() private field: any = {};
  @Input() private form: FormGroup;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() {
    // TODO:
  }
}
