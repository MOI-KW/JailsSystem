// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /* ***** MIDDLEWARE URLS ***** */

  //test
  // clientPrefix: 'ZIT',
  // baseURL: 'https://apptest.moi.gov.kw',
  // digitalDocsURL: 'https://apptest.moi.gov.kw/digitalDocs/',
  // sahlURL: 'https://apptest.moi.gov.kw/sahl/notification',

  //production
  clientPrefix: 'ZCS',
  baseURL: 'https://app.moi.gov.kw',
  digitalDocsURL: 'https://app.moi.gov.kw/digitalDocs/',
  sahlURL: 'https://app.moi.gov.kw/sahl/notification',

  loginURL: '/moi/login',
  refreshTokenURL: '/moi/token',
  changePassword: '/moi/changePassword',
  userAuth: '/moi/SU001/Su001GetUserAuth',
  personDetails: '/moi/NT022/GetPersonDetails',
  personDetailsDisplay: '/moi/RE004/PersonDetailsDisplay',
  photo: '/moi/PE013/Pe013GetLatestPassportImage',
  biometric_photo: '/moi/FP011/DisplayPersonPhoto', //non-kuwaiti
  nationality_photo: '/moi/SH011/InquirePersonPhoto',
  nationalitiesList: "/moi/GQAY/GqayListNationalitySvr",

  //mib
  jailIdrl: '/moi/JE008/JudgementStatInJail',
  prisonerData: '/moi/JE009/JudgementListInJail',



  GetPersonCustodyInfo: "/moi/JP004/Jp004GetPersonCustodyInfo",
  custodyListInPrison: "/moi/JP003/Jp003CustodyListInPrison",
  custodyStatsInPrison: "/moi/JP002/Jp002CustodyStatsInPrison",
  getPersonJailInfo: "/moi/JP001/Jp001GetPersonJailInfo",

  searchByName: "/moi/GQBC/GqbcSearchByName",

  AppTitle: 'لوحة بيانات السجون',
  system_name: 'JAILDASHBORD',
  clearCookies: '/moi/clear-all-cookies',
};
