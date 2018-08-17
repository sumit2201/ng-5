import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";
import { Validations } from "../../../common/utility";

@Component({
  templateUrl: "./form-loader.template.html",
})
export class FormLoaderComponent implements OnInit {
  @Input() public schema: any;
  @Input() public formData: any;
  private fields: any[] = [];
  constructor(
    public route: ActivatedRoute, private http: HttpClient, private global: Globals
  ) {
    this.schema = {};
    this.formData = {};
  }

  public ngOnInit() {
    this.prepareFormFields();
  }

  private resetFormDetails() {
    this.fields = [];
  }

  private prepareFormFields() {
    this.resetFormDetails();
    if (!Validations.isObjectEmpty(this.schema)) {
      for (const fieldId in this.schema) {
        if (this.schema.hasOwnProperty(fieldId)) {
          const fieldObj = this.schema[fieldId];
          fieldObj.id = fieldId;
          if (!Validations.isNullOrUndefined(this.formData[fieldId])) {
            fieldObj.value = this.formData[fieldId];
          }
          this.fields.push(fieldObj);
        }
      }
    }
  }
}
