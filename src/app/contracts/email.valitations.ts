import { AbstractControl } from '@angular/forms';

export function EmailValidator(e: AbstractControl) {
    let cVal = e.value;

    let test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cVal);
              

    if (test === false) {
        return { 'emailError': true };
    }

    return null;
    
};