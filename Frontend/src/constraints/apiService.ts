import axios from 'axios';
import { userEndPoints } from './endPoints';
import { Account, FinancailInformation, PersonalInformation } from '../interface/IAccount';

const userService = {

    createAccount: async (data: Account) => {
        try {
            const result = await axios.post(userEndPoints.createAccount, data);
            return result;
        } catch (error) {
            console.log('Internal server erros', error);
        }
    },

    addPersonalInformation: async (data: PersonalInformation) => {
        try {
            const result = await axios.post(userEndPoints.personalInfo, data);
            return result
        } catch (error) {
            console.log('Internal server erros', error);
        }
    },

    addFinancialInformation: async (data: FinancailInformation) => {
        try {
            const result = await axios.post(userEndPoints.financialInfo, data);
            return result
        } catch (error) {
            console.log('Internal server erros', error);
        }
    },

    getUserById: async (id: string | undefined) => {
        try {
            console.log(id);
            const result = await axios.get(`${userEndPoints.getUserData}/${id}`);
            return result
        } catch (error) {
            console.log('Internal server erros', error);
        }
    }
}

export default userService