export class Person {
    PersonRSAC: RSAC //RSAC_LIST_PERSON_INDICATORS
    PersonDetails: ExportPersonEntry
    Person_BgColor:string
    KuwaitiPerson_Img:string = null
    biometricPerson_Img:string = null
    DisabilitiesInfo:disabilitiesInfo =null
    Address=null
    Apartment=null
    CommunicationDetail =null

}
export class disabilitiesInfo
{
        CivilNumber: string
        Name: string
        FileStatus: string
        WSMessage: string
        WSHits: string
        FileStatusAr: string
        FileStatusEn:string
        Disabilities: any
            
    }

export class personList{
    personNumber:string
    civilID:string
    personName: string
    nationlity:string
    birthdate:string
    sex:string
}

export class  RSAA {
    ExportWebServiceResponse: {
        ReturnCode: string
        ReturnMessage: string
    }
    ExportPersonEntry: {
        PersonNumber: string
        ArabicFullName: string
        Nationlity: string
        BirthDate: string
        Sex: string
        PersonType: string
        CivilId: string
    }
    ExportRequestForSearch: {
        GccCountryCode: string
    }
    ExportIdNumber: {
        Number: string
    }
}


export class RSAC {
    ExportWebServiceResponse: {
        ReturnCode: string
        ReturnMessage: string
    }
    ExportPersonEntry: {
        PersonNumber: string
        ArabicFullName: string
        Nationlity: string
        BirthDate: string
        Sex: string
        PersonType: string
        CivilId: string
        Occupation: string
    }
    ExportGqConcatPpArabicName: {
        WholeArabicName: string
    }
    ExportMoiPersonMainWorkSet: {
        MoiRankTitle: string
        MoiPersPostJobt: string
        MoiCurrentWorkingDept: string
    }
    ExportList: {
        row: any
    }
    ExportListDls:{row:any}
    ExportGroupDisabilities: {
        DIS_TYPE_AR:String
    }
}
export class User {
//    token: String
//    refreshToken:String
    //clientId:String 
    userId:String
    userFullName: String
    civilIdNumber: String
    currentRank: String
    jobTitle: String
    position: String
    deparment: String
    FileNumber: string
    NationalNumber:string
    Status:String
    CreateViolationTickets: string
    ViewPhotoAccess: string
    expiryDate:string
}


export class RSAD {
    ExportWebServiceResponse: {
        ReturnCode: string
        ReturnMessage: string
    }
    ExportPersonEntry: {
        PersonType: string
        PersonNumber: string
        CivilId: string
    }
    ExportMainWorkSet: {
        CategoryName: string
    }
    ExportGroup: {
        row: {}
    }
}

export class RSAB {
    ExportWebServiceResponse: {
        ReturnCode: string
        ReturnMessage: string
    }
    ExportAlienPassport: {
        PassportNo: string
    }
    ExportList: {
        row: {}
    }
}

export class  ExportPersonEntry {
    PersonType: string
    PersonNumber: string
    ArabicFullName: string
    Nationlity: string
    BirthDate: string
    CivilId: string
    Sex: string
    Occupation: string
    sponsor:string
}