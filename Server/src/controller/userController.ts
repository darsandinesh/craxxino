import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Account } from '../interface/IAccount';
import { accountValidation, financialInfoValidation, personalInfoValidation } from '../utils/validation';
import userModel from '../model/userModel';
import PersonalInfo from '../model/personalInfo'
import FinancialInfo from '../model/financialInfo';

// to create a new account
const createAccount = async (req: Request, res: Response) => {
    try {
        const { email, mobile, password } = req.body;

        const validationErrors = accountValidation(req.body);
        if (Object.keys(validationErrors).length > 0) {
            res.status(200).json({ success: false, validationErrors });
            return;
        }

        const existingUser = await userModel.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            res.status(200).json({ success: false, message: 'Email or mobile number already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ email, mobile, password: hashedPassword });
        await newUser.save();

        const userResponse = newUser.toObject() as { [key: string]: any };
        delete userResponse.password;

        res.status(201).json({ success: true, message: 'Account created successfully', user: userResponse });
    } catch (error) {
        console.log('Internal server Error ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// to add the personal information of the user
const addPersonalInfo = async (req: Request, res: Response) => {
    try {

        const validationErrors = personalInfoValidation(req.body);
        if (Object.keys(validationErrors).length > 0) {
            res.status(200).json({ success: false, validationErrors });
            return;
        }

        const { id, title, fullName, dob, address, duration, about } = req.body;

        const newPersonalInfo = new PersonalInfo({
            userId: id,
            title,
            fullName,
            dob,
            address,
            duration,
            about
        })

        await newPersonalInfo.save();

        res.status(200).json({ success: true, message: "Personal information added successfully", data: newPersonalInfo })

    } catch (error) {
        console.log('Internal server Error ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// to add the financial information of the user
const addFinancialInfo = async (req: Request, res: Response) => {
    try {

        const validationErrors = financialInfoValidation(req.body);
        if (Object.keys(validationErrors).length > 0) {
            res.status(200).json({ success: false, validationErrors });
            return
        }

        const { id, employmentStatus, savings } = req.body;

        const newFinancialInfo = new FinancialInfo({
            userId: id,
            employmentStatus,
            savings
        });

        await newFinancialInfo.save();

        const financialInfoResponse = newFinancialInfo.toObject() as { [key: string]: any };
        financialInfoResponse.url = `${process.env.Frontend_URL}/home/${id}`;

        res.status(200).json({ success: true, message: "Financial information added successfully", data: financialInfoResponse });

    } catch (error) {
        console.log('Internal server Error ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// to get the user data
const getUserData = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const user = await userModel.findById(userId).lean();
        if (!user) {
            res.status(200).json({ success: false, message: 'User not found' });
            return;
        }

        const personalInfo = await PersonalInfo.findOne({ userId }).lean();
        if (!personalInfo) {
            res.status(200).json({ success: false, message: 'Personal infomation not found' });
            return;
        }

        const financialInfo = await FinancialInfo.findOne({ userId }).lean();
        if (!financialInfo) {
             res.status(200).json({ success: false, message: 'Financial information not found' });
             return
        }

        const userData = {
            ...user,
            personalInfo,
            financialInfo
        };

        res.status(200).json({ success: true, data: userData });

    } catch (error) {
        console.log('Internal server Error ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    createAccount,
    addPersonalInfo,
    addFinancialInfo,
    getUserData
}