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
import { IActionInfo } from "../../../common/interfaces";

@Component({
  templateUrl: "./form-loader.template.html",
})
export class FormLoaderComponent implements OnInit {
  @Input() private widgetData: AppFormData;
  private fields: any[] = [];
  private actions: IActionInfo[] = [];
  constructor(
    public route: ActivatedRoute, private http: HttpClient, private global: Globals
  ) {
  }

  public ngOnInit() {
    this.resetFormDetails();
    this.setFormDetails();
    this.prepareFormFields();
    this.prepareFormActions();
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

  private prepareFormActions() {
    if (!Validations.isObjectEmpty(this.widgetData.schema) && !Validations.isObjectEmpty(this.widgetData.schema.fields)) {
      for (const action of this.widgetData.schema.actions) {
        this.actions.push(action);
      }
    }
  }
}
