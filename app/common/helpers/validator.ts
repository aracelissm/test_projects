import {
    AbstractControl,
    UntypedFormGroup,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export class Validator {
    private constructor() {}

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl) => {
            if (control.value && !control.value.match(regex)) {
                return error;
            }
            return null;
        };
    }

    static matchValidator(ctrlName: string, matchingCtrlName: string) {
        return (formGroup: UntypedFormGroup) => {
            const ctrl = formGroup.controls[ctrlName];
            const matchingCtrl = formGroup.controls[matchingCtrlName];
            if (matchingCtrl.errors && !matchingCtrl.errors['mismatch']) {
                return;
            }
            if (ctrl.value !== matchingCtrl.value) {
                matchingCtrl.setErrors({ mismatch: true });
            } else {
                matchingCtrl.setErrors(null);
            }
        };
    }
}
