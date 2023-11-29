import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

function passwordValidator(control: AbstractControl) {
  const password = control.value;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  if (!isValid) {
    return { invalidPassword: true };
  }

  return null;
}

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';


  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }
  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {

  }

  get control() : FormControl {
    return this.ngControl.control as FormControl;
  }


}
