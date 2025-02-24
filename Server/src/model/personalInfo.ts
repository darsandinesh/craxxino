import mongoose from 'mongoose';

const personalInfoSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userModel', 
        required: true 
    },
    title: {
        type: String,
        required: true,
        enum: ['Mr', 'Mrs']
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;