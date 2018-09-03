import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IActionInfo } from "../../common/interfaces";

@Component({
  selector: "dynamic-form-builder",
  templateUrl: "./dynamic-form-builder.template.html",
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() private onSubmit = new EventEmitter();
  @Input() private fields: any[] = [];
  @Input() private actions: IActionInfo[] = [];
  private form: FormGroup;
  constructor() {
    // TODO:
  }

  public ngOnInit() {
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type !== "checkbox") {
        fieldsCtrls[f.name] = new FormControl(f.value || "", Validators.required);
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }
}
