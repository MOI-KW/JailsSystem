export class FormFunctions {

    static digitsOnly(event: { charCode: any; }) {

        var k;  
        k = event.charCode;  
        return k >= 48 && k <= 57;
    }
    static digitsWithHyphen(event: { charCode: any; }) {

        var k;  
        k = event.charCode;  
        return k >= 48 && k <= 57 || k==45;
    }
}