import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'interview'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    result: {
        type: String,
        enum: ["Pending","PASS", "FAIL", "OnHold", "Didn’t Attempt"],
        required: [true,"Please enter interview result"]
    }
})

export const ResultModel = mongoose.model('result',resultSchema);