import { createCSV } from "../../utils/createCSV.js";
import { addResultToDB, getAllResults, updateResultToDB } from "./result.repository.js"

export const addResult = async (req,res,next) => {
    const {interviewId,allocatedStudentId} = req.body;
    const resp = await addResultToDB({interviewId,studentId:allocatedStudentId});
    if(resp.success) {
        res.redirect(`interviews/${interviewId}`);
    }
    else if(!resp.success && resp.err.statusCode == '404') {
        res.render('interviewDetails',{error:resp.err.msg});
    }
    else{
        console.log(resp.err);
    }
}

export const updateResult = async (req,res,next) => {
    const {resultId,interviewId,result} = req.body;
    const resp = await updateResultToDB(resultId,result);
    if(resp.success){
        res.redirect(`/interviews/${interviewId}`);
        // res.status(200).json({success:true,res:resp.result});
    }
    else if(!resp.success && resp.err.statusCode == '404') {
        res.render('interviewDetails',{error:resp.err.msg});
    }
    else{
        console.log(resp.err);
    }
}

export const sendCSV = async (req,res,next) => {
    const resp = await getAllResults();
    if(resp.success){
        const csv = await createCSV(resp.results);
        res.attachment('students.csv');
        res.status(200).send(csv);
        // res.redirect(`/interviews/${interviewId}`);
        // res.status(200).json({success:true,res:csv});
    }
    else{
        console.log(resp.err);
    }
}