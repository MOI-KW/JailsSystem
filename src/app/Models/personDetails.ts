// export class personInfo {
//   attributes: {
//     command: string;
//     exitState: string;
//     exitStateType: string;
//     exitStateMsg: string;
//   };
//   ExportOutputParameters: {
//     ReturnCode: string;
//     ReturnMessage: string;
//     ReturnMessageEn: string;
//   };
//   ExportOwnerPermanentPerson: {
//     CivilIdNumber:string;
//     BirthDate:string;
//     Sex:string;
//   };
//   ExportOwnerOccupation: {
//     Description: string;
//   };
//   ExportOwnerConcatPpName: {
//     CompressedArabicWholeName: string;
//   };
//   ExportOwnerNationality: {
//     ArabicDescription:string;
//   };
//   ExportOwnerNationalityInformation: {
//     NationalityType:string;
//     Article:string;
//     OriginalNationality: string;
//   };
//   ExportFatherPermanentPerson: {
//     CivilIdNumber: string;
//     Status:string;
//   };
//   ExportFatherConcatPpName: {
//     CompressedArabicWholeName:string;
//   };
//   ExportFatherNationality: {
//     ArabicDescription: string;
//   };
//   ExportFatherNationalityInformation: {
//     NationalityType: string;
//     Article:string;
//     OriginalNationality: string;
//   };
//   ExportMotherPermanentPerson: {
//     CivilIdNumber: string;
//     Type: string;
//     Status:string;
//   };
//   ExportMotherConcatPpName: {
//     CompressedArabicWholeName: string;
//   };
//   ExportMotherNationality: {
//     ArabicDescription: string;
//   };
//   ExportMotherNationalityInformation: {
//     NationalityType: string;
//     Article: string;
//     OriginalNationality: string;
//   };
//   ExpGroupWife: {
//     row:wifeDetails [];
//   };
// }

// export class wifeDetails{

//     ExpGrpWifePermanentPerson: {
//       CivilIdNumber: string;
//     };
//     ExpGrpWifeConcatPpName: {
//       CompressedArabicWholeName:string
//     };
//     ExpGrpWifeNationality: {
//       ArabicDescription:string
//     };
//   }

export class personInfo {
  attributes: {
    command:string; 
    exitState: string;
    exitStateType: string;
    exitStateMsg: string;
  };
  ExportOutputParameters: {
    ReturnCode: string;
    ReturnMessage: string;
    ReturnMessageEn: string;
  };
  ExportOwnerPermanentPerson: {
    CivilIdNumber:string;
    BirthDate: string;
    Sex: string;
    MaritalStatus:string;
    Status: string;
    Type: string;
    Ownership:string;
  };
  ExportOwnerOccupation: {
    Description: string;
  };
  ExportOwnerConcatPpName: {
    CompressedArabicWholeName: string;
  };
  ExportOwnerNationality: {
    ArabicDescription: string;
  };
  ExportOwnerNationalityInformation: {
    NationalityType:string;
    Article:string;
    KuNationalityIssueDate: string;
    Clause:string;
    OriginalNationality: string;
  };
  ExportFatherPermanentPerson: {
    CivilIdNumber: string;
    Status: string;
    Sex: string;
    BirthDate: string;
    Type: string;
    MaritalStatus: string;
    Ownership:string;
  };
  ExportFatherConcatPpName: {
    CompressedArabicWholeName:string;
  };
  ExportFatherNationality: {
    ArabicDescription: string;
  };
  ExportFatherNationalityInformation: {
    NationalityType:string;
    Article: string;
    KuNationalityIssueDate: string;
    Clause:string;
    OriginalNationality:string;
  };
  ExportMotherPermanentPerson: {
    CivilIdNumber: string;
    Type: string;
    Status: string;
    Sex:string;
    BirthDate: string;
    Ownership:string;
    MaritalStatus: string;
  };
  ExportMotherConcatPpName: {
    CompressedArabicWholeName: string;
  };
  ExportMotherNationality: {
    ArabicDescription: string;
  };
  ExportMotherNationalityInformation: {
    NationalityType: string;
    Article:string;
    KuNationalityIssueDate:string;
    Clause:string;
    OriginalNationality: string;
  };
  ExpGroupWife: {
    row:wifeDetails [];
  };
}

export class wifeDetails{
    ExpGrpWifePermanentPerson: {
      CivilIdNumber: string;
      Type: string;
      Sex:string;
      BirthDate: string;
      MaritalStatus:string;
      Ownership:string;
      Status:string;
    };
    ExpGrpWifeConcatPpName: {
      CompressedArabicWholeName:string;
    };
    ExpGrpWifePersonalRelationship: {
      RelationshipDescription: string;
      EndDateReason: string;
    };
    ExpGrpWifeNationality: {
      ArabicDescription: string;
    };
    ExpGrpWifeNationalityInformation: {
      NationalityType:string;
      Article:string;
      Clause:string;
      OriginalNationality:string;
      KuNationalityIssueDate:string
    };
  
  }

  export enum Relationship {
    Father = "Father", 
    Mother="Mother", 
    Wife="Wife", 
  }