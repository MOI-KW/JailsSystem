
export class PlateCategoryModel {

    code!: string; 
    img!: string;
    ar!: string; 
    en!: string;
}
export class PlateCategory {

    public static Saudi: any[] = [];

    static get(countryCode: string) {

        if (!countryCode) return [];

        let plates: PlateCategoryModel[] = [];

        switch(countryCode) {

            case "1": plates = this.get_SaudiArabia(); break;
            case "2": plates = this.get_Bahrain(); break;
            case "3": plates = this.get_Qatar(); break;
            // case "4": plates = this.get_Oman(); break;
            // case "5": plates = this.get_Dubai(); break;
            // case "6": plates = this.get_Abudhabi(); break;
            // case "7": plates = this.get_Sharjah(); break;
            // case "8": plates = this.get_UmmAlQuwain(); break;
            // case "9": plates = this.get_Fujairah(); break;
            // case "10": plates = this.get_Ajman(); break;
            // case "11": plates = this.get_RasAlKhaimah(); break;

            default: plates = []; break;
        }

        return plates;
    }
    
    private static get_SaudiArabia() { 

        let plates: PlateCategoryModel[] = [
            { code: "1", img: "./assets/plates/1/", ar: "", en: "" },
            { code: "2", img: "./assets/plates/1/", ar: "", en: "" },
            { code: "3", img: "./assets/plates/1/", ar: "", en: "" },
            { code: "9", img: "./assets/plates/1/", ar: "", en: "" },
            { code: "10", img: "./assets/plates/1/", ar: "", en: "" }
        ];
        
        return plates;    
    }
    
    private static get_Bahrain() {
        
        let plates: PlateCategoryModel[] = [
            { code: "001", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "002", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "003", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "004", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "005", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "006", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "007", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "008", img: "./assets/plates/2/", ar: "", en: "" },
            { code: "009", img: "./assets/plates/2/", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Qatar() {
        
        let plates: PlateCategoryModel[] = [
            { code: "1", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "2", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "13", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "14", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "16", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "17", img: "./assets/plates/3/", ar: "", en: "" },
            { code: "19", img: "./assets/plates/3/", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Oman() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Dubai() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Abudhabi() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Sharjah() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_UmmAlQuwain() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Fujairah() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_Ajman() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }
    
    private static get_RasAlKhaimah() {
        
        let plates: PlateCategoryModel[] = [
            { code: "", img: "", ar: "", en: "" },
            { code: "", img: "", ar: "", en: "" }
        ];
        
        return plates; 
    }

}