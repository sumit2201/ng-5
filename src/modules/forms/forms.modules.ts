import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormsComponent } from "./components/forms.component";

@NgModule({
    bootstrap: [FormsComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule],
    declarations: [FormsComponent],
    exports: [FormsComponent],
})

export class DynamicFormsModule { }
