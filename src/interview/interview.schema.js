import mongoose from 'mongoose';

const interviewSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true,'Please enter company name']
    },
    date: {
        type: Date,
        required: [true,"Please enter interview date"]
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'result'
    }],
})

export const InterviewModel = mongoose.model('interview',interviewSchema);