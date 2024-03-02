import express from "express";
import { addInterview, addInterviewPage, getInterviewDetails, getInterviews } from "./interview.controller.js";
import { auth } from "../../middleware/auth.js";

const InterviewRouter = express.Router();

InterviewRouter.post('/',auth,addInterview);
InterviewRouter.get('/add-interview',auth,addInterviewPage);
InterviewRouter.get('/',auth,getInterviews);
InterviewRouter.get('/:interviewId',auth,(req,res,next) => {
    getInterviewDetails(req,res,next);
});

export default InterviewRouter;