import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection';
import userRouter from './router/userRouter';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

dbConnection();

const corsOptsion = {
    origin: process.env.Frontend_URL,
    methods: ['GET','POST','DELETE','PUT'],
}

app.use(cors(corsOptsion));
app.use(express.json());

app.use('/',userRouter);

app.listen(PORT, () => console.log(`server running on port : ${PORT}`));