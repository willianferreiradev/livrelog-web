import { FormArray, FormGroup } from '@angular/forms';

export abstract class BaseForm {

  form: FormGroup;

  abstract submit(): void;

  abstract createForm(): void;

  onSubmit(): void {
    if (this.form.valid) {
      this.submit();
    } else {
      this.checkValidations(this.form);
    }
  }

  checkValidations(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkValidations(control);
      }
    });
  }

  reset(): void {
    this.form.reset();
  }


  checkIsValidTouched(field: string): boolean {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  apllyErrorClass(field: string): unknown {
    return {
      'has-error': this.checkIsValidTouched(field)
    };
  }

  get formValue(): any {
    return this.form.value;
  }

  get formRawValue(): any {
    return this.form.getRawValue();
  }
}
