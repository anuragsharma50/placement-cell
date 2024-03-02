import { addInterviewToDB, allocateStudentToDB, getInterviewByIdFromDB, getInterviewsFromDB } from "./interview.repository.js";

export const addInterviewPage = (req,res,next) => {
    res.render('addInterview',{error:null});
}

export const getInterviewDetails = async (req,res,next) => {
    const interviewId = req.params.interviewId;
    const resp = await getInterviewByIdFromDB(interviewId);
    if(resp.success) {
        res.render('interviewDetails',{error:null,interviewData:resp.interviewData});
    }
    else if(!resp.success && resp.err.statusCode == '404') {
        res.render('interviewDetails',{error:"Please provide a valid Interview Id"});
    }
    else{
        console.log(resp.err);
        res.render('interviewDetails',{error:null});
    }
}

export const addInterview = async (req,res,next) => {
    const {companyName,date} = req.body;
    const resp = await addInterviewToDB({companyName,date});
    if(resp.success) {
        // res.status(201).json({success:true, res:resp.interview});
        res.redirect('/interviews');
    }
    else{
        console.log(resp.err);
    }
}

export const getInterviews = async (req,res,next) => {
    const resp = await getInterviewsFromDB();
    if(resp.success) {
        // res.status(201).json({success:true, res:resp.interviews})
        res.render('interviews',{interviews:resp.interviews})
    }
    else{
        console.log(resp.err);
    }
}