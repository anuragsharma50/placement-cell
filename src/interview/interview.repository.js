import { ResultModel } from "../result/result.schema.js";
import { StudentModel } from "../student/student.schema.js"
import { InterviewModel } from "./interview.schema.js"

export const addInterviewToDB = async (interview) => {
    try{
        const newInterview = new InterviewModel(interview);
        await newInterview.save();
        return {success:true,interview:newInterview};
    } catch(err) {
        return {success:false,err};
    }
}

export const getInterviewsFromDB = async () => {
    try{
        const interviews = await InterviewModel.find({});
        return {success:true,interviews};
    } catch(err) {
        return {success:false,err};
    }
}

export const getInterviewByIdFromDB = async (interviewId) => {
    try{
        const interview = await InterviewModel.findById(interviewId,{results:0});
        if(!interview) {
            return {success:false,err:{
                statusCode: 404,
                msg: 'Interview not found'
            }};
        }

        const students = await ResultModel.find({interview:interviewId}).populate('student');

        const interviewData = {
            interview,
            students
        }
        return {success:true,interviewData};
    } catch(err) {
        return {success:false,err};
    }
}

export const allocateStudentToDB = async (allocatedStudentId,interviewId) => {
    try{
        const interview = await InterviewModel.findById(interviewId);

        if(!interview) {
            return {success:false,err:{
                statusCode: 404,
                msg: 'Interview not found'
            }};
        }

        const student = await StudentModel.findOne({"studentDetails.studentId":allocatedStudentId});
        if(!student) {
            return {success:false,err:{statusCode: 404,msg:'Student not found'}};
        }
        interview.students.push(student._id);
        student.interviews.push(interviewId);
        await interview.save();
        await student.save();
        return {success:true,interview};
    } catch(err) {
        return {success:false,err};
    }
}