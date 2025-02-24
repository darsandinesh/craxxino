export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;


export const userEndPoints = {
    createAccount: `${BASE_URL}`,
    personalInfo: `${BASE_URL}/personalInfo`,
    financialInfo: `${BASE_URL}/financialInfo`,
    getUserData: `${BASE_URL}/userData`,
}