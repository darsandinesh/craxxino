import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL || '');
        console.log('database connected successful')
    } catch (error) {
        console.log('dbConnection error :', error);
    }
}

export default dbConnection