import { InterviewModel } from "../interview/interview.schema.js";
import { StudentModel } from "../student/student.schema.js";
import { ResultModel } from "./result.schema.js"

export const addResultToDB = async ({interviewId,studentId}) => {
    try{
        const student = await StudentModel.findOne({"studentDetails.studentId":studentId});
        if(!student) {
            return {success:false,err:{
                statusCode: 404,
                msg: 'Student not found'
            }};
        }

        const interview = await InterviewModel.findById(interviewId);

        if(!interview) {
            return {success:false,err:{
                statusCode: 404,
                msg: 'Interview not found'
            }};
        }

        const result = new ResultModel({interview:interviewId,student:student._id,result:'Pending'});
        student.results.push(result._id);
        interview.results.push(result._id);

        await result.save();
        await student.save();
        await interview.save();

        return {success:true,result};
    } catch(err) {
        return {success:false,err};
    }
}

export const updateResultToDB = async (resultId,result) => {
    try{
        const DBresult = await ResultModel.findByIdAndUpdate(resultId,{result:result},{new: true});
        if(!DBresult) {
            return {success:false,err:{
                statusCode: 404,
                msg: 'Result not found'
            }};
        }

        await DBresult .save();
        return {success:true,result:DBresult};
    } catch(err) {
        return {success:false,err};
    }
}

export const getAllResults = async () => {
    try{
        const results = await ResultModel.find({},{_id:0,__v:0}).populate('student',{_id:0,results:0,__v:0}).populate('interview',{_id:0,results:0,__v:0}).sort({'student':1});

        return {success:true,results}
    } catch(err) {
        return {success:false,err};
    }
}
