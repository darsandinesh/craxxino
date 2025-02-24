import { Account, FinancialInformation, PersonalInformation } from "../interface/IAccount";

// to validate the data while creating the account before saving;
const accountValidation = (data: Account) => {
    const errors: { email?: string; mobile?: string; password?: string } = {};

    try {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobilePattern = /^[0-9]{10}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!emailPattern.test(data.email)) {
            errors.email = "Invalid email address.";
        }
        if (!mobilePattern.test(data.mobile)) {
            errors.mobile = "Invalid mobile number. It should be 10 digits.";
        }
        if (!passwordPattern.test(data.password)) {
            errors.password = "Password must be at least 6 characters long and contain at least one letter and one number.";
        }
        return errors;
    } catch (error) {
        console.error(error);
    }

    return errors;
}

// to validate the personal information of the user before saving;
const personalInfoValidation = (data: PersonalInformation) => {
    const errors: { title?: string; fullName?: string; dob?: string; address?: string; duration?: string; about?: string } = {};

    try {
        if (!data.title || typeof data.title !== 'string') {
            errors.title = "Title is required and must be a string.";
        }
        if (!data.fullName || typeof data.fullName !== 'string') {
            errors.fullName = "Full name is required and must be a string.";
        }
        const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!dobPattern.test(data.dob)) {
            errors.dob = "Date of birth must be in the format YYYY-MM-DD.";
        } else {
            const dob = new Date(data.dob);
            let age = new Date().getFullYear() - dob.getFullYear();
            const monthDiff = new Date().getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dob.getDate())) {
                age--;
            }
            if (age < 18) {
                errors.dob = "Age must be greater than 18.";
            }
        }
        if (!data.address || typeof data.address !== 'string') {
            errors.address = "Address is required and must be a string.";
        }
        if (!data.duration || isNaN(Number(data.duration))) {
            errors.duration = "Duration is required and must be a number.";
        }
        if (!data.about || typeof data.about !== 'string') {
            errors.about = "About is required and must be a string.";
        }
        return errors;
    } catch (error) {
        console.error(error);
        return {}
    }
}

// to validate the financial infromation of the user before saving;
const financialInfoValidation = (data:FinancialInformation) => {
    const errors: { employmentStatus?: string; savings?: string } = {};

    try {
        if (!data.employmentStatus || typeof data.employmentStatus !== 'string') {
            errors.employmentStatus = "Employment status is required and must be a string.";
        }
        if (!data.savings || typeof data.savings !== 'string') {
            errors.savings = "Savings is required and must be a string.";
        }
        return errors;
    } catch (error) {
        console.error(error);
        return {}
    }
}

export {
    accountValidation,
    personalInfoValidation,
    financialInfoValidation
}