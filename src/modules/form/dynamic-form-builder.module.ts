import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// components
import { DynamicFormBuilderComponent } from "./dynamic-form-builder.component";
import { FieldBuilderComponent } from "./field-builder/field-builder.component";
import { TextBoxComponent } from "./fields/text/textbox-input.component";
import { DropDownComponent } from "./fields/dropDown/dropdown-input.component";
import { FileComponent } from "./fields/file/file-input.component";
import { CheckBoxComponent } from "./fields/checkbox/checkbox-input.component";
import { RadioComponent } from "./fields/radio/radio-input.component";
import { DataProviderService } from "../../services/data-provider.service";
import { ActionButtonComponent } from "./fields/button/button-input.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormBuilderComponent,
    FieldBuilderComponent,
    TextBoxComponent,
    DropDownComponent,
    CheckBoxComponent,
    FileComponent,
    RadioComponent,
    ActionButtonComponent,
  ],
  exports: [DynamicFormBuilderComponent],
  providers: [DataProviderService]
})
export class DynamicFormBuilderModule { }
