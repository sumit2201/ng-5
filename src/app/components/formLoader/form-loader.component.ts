import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Globals } from "../../../common/global";
import { Validations } from "../../../common/utility";
import { AppFormData } from "../../../common/app-data-format";

@Component({
  templateUrl: "./form-loader.template.html",
})
export class FormLoaderComponent implements OnInit {
  @Input() private widgetData: AppFormData;
  private fields: any[] = [];
  constructor(
    public route: ActivatedRoute, private http: HttpClient, private global: Globals
  ) {
  }

  public ngOnInit() {
    this.setFormDetails();
    this.prepareFormFields();
  }

  private resetFormDetails() {
    this.fields = [];
  }

  private setFormDetails() {
    if (Validations.isNullOrUndefined(this.widgetData)) {
      this.widgetData = new AppFormData();
      this.widgetData.schema = {};
      this.widgetData.formData = {};
    } else if (Validations.isNullOrUndefined(this.widgetData.schema)) {
      this.widgetData.schema = {};
    } else if (Validations.isNullOrUndefined(this.widgetData.formData)) {
      this.widgetData.formData = {};
    }
  }

  private prepareFormFields() {
    this.resetFormDetails();
    if (!Validations.isObjectEmpty(this.widgetData.schema) && !Validations.isObjectEmpty(this.widgetData.schema.fields)) {
      for (const fieldId in this.widgetData.schema.fields) {
        if (this.widgetData.schema.fields.hasOwnProperty(fieldId)) {
          const fieldObj = this.widgetData.schema.fields[fieldId];
          fieldObj.id = fieldId;
          if (!Validations.isNullOrUndefined(this.widgetData.formData[fieldId])) {
            fieldObj.value = this.widgetData.formData[fieldId];
          }
          this.fields.push(fieldObj);
        }
      }
    }
  }
}
