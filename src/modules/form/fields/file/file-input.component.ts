import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

// text,email,tel,textarea,password, 
@Component({
  selector: "file",
  templateUrl: "./file.template.html",
  styleUrls: ["./file-input.style.scss"],
})
export class FileComponent {
  @Input() private field: any = {};
  @Input() private form: FormGroup;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }

  constructor() {
    // TODO:
  }

  public ngOnChange() {
    console.log(this.field.value);
    // this.field.value.
  }
}
