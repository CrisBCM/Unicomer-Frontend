import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function repeatPasswordValidator(passwordControl:AbstractControl): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
        const password = passwordControl.value;
        const confirmPassword = control.value;

        if(confirmPassword !== password){

            return {repeatPasswordValidator : true}
        }
        return null;
    }
}