import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'radio',
  templateUrl: "radio-input.template.html",
})
export class RadioComponent {
  @Input() private field: any = {};
  @Input() private form: FormGroup;
}