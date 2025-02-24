export interface Account {
    email: string,
    mobile: string,
    password: string
}

export interface PersonalInformation {
    id: string
    title: string,
    fullName: string,
    dob: string,
    address: string,
    duration: string,
    about: string
}

export interface FinancailInformation {
    id?:string,
    employmentStatus: string,
    savings: string
}