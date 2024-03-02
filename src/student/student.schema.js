import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    batch: {
        type: String,
        required: [true,"Please enter student's batch"]
    },
    studentDetails:{
        studentId: {
            type: String,
            required: [true,"Please enter student's id"],
            unique: true
        },
        name: {
            type: String,
            required: [true,"Please enter student's name"]
        },
        college: {
            type: String,
            required: [true,"Please enter student's college"]
        },
        status: {
            type: String,
            enum: ['placed','not_placed'],
            default: 'not_placed'
        }
    },
    coursesScore: {
        DSAFinalScore: {
            type: Number,
            required: [true,"Please enter student's DSA score"]
        },
        webDFinalScore: {
            type: Number,
            required: [true,"Please enter student's Web development score"]
        },
        reactFinalScore: {
            type: Number,
            required: [true,"Please enter student's React score"]
        }
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'result'
    }],
})

export const StudentModel = mongoose.model('student',studentSchema);
