import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup,
): ValidationErrors | null => {
    const hasAtLeastOne =
        group &&
        group.controls &&
        Object.keys(group.controls).some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : { atLeastOne: true };
};

export const matchPasswords = () => (
    group: FormGroup,
): ValidationErrors | null => {    
        
    const isMatching =
        group &&
        group.controls &&
        group.controls['newpassword'].value == group.controls['confirmpassword'].value;

    return isMatching ? null : { matchPasswords: true };
}