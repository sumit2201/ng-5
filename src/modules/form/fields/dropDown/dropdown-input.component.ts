import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "dropdown",
  templateUrl: "./dropdown-template.html",
})
export class DropDownComponent {
  @Input() private field: any = {};
  @Input() private form: FormGroup;

  constructor() {
    // TODO:
  }
}
