import mongoose,{ Schema } from "mongoose";

const FinancialInfoSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    employmentStatus: {
        type: String,
        required: true,
        enum: ['employed', 'unemployed', 'student', 'retired']
    },
    savings: {
        type: String,
        required: true
    }
}, { timestamps: true });

const FinancialInfo = mongoose.model('FinancialInfo', FinancialInfoSchema);

export default FinancialInfo;