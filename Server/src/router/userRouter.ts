import express from 'express';
import { createAccount, addPersonalInfo, addFinancialInfo, getUserData } from '../controller/userController';

const userRouter = express.Router();

// create account router;
userRouter.post('/', createAccount);

// to add personal information of the user;
userRouter.post('/personalInfo', addPersonalInfo);

// to add fincancial information of the user;
userRouter.post('/financialInfo', addFinancialInfo);

// to get all the perticular user data;
userRouter.get('/userData/:id', getUserData);

export default userRouter;