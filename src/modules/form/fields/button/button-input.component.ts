import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IActionInfo } from "../../../../common/interfaces";
import { DataProviderService } from "../../../../services/data-provider.service";

@Component({
  selector: "action-button",
  templateUrl: "./button-input.template.html",
})
export class ActionButtonComponent {
  @Input() private action: IActionInfo = null;
  @Input() private form: FormGroup;

  constructor(private dataProviderService: DataProviderService) {
    // TODO;
  }

  public performAction(action: IActionInfo) {
    console.error(this.form);
    this.dataProviderService.performAction(action, this.form.value);
  }
}
