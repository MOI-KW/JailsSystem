export class User {
    token?: string | null = ""
}

export class UserProfile {

    Number: string = "";
    Name: string = "";
    RefNumber: string = "";
    StartDate: string = "";
    EndDate: string = "";
}

export class ChangePasswordModel {

    userid: string = "";
    password: string = "";
    newpassword: string = "";
}