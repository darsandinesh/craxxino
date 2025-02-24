import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model('userModel', UserSchema);

export default userModel;