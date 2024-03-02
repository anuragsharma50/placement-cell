import express from "express";
import { addResult, sendCSV, updateResult } from "./result.controller.js";
import { auth } from "../../middleware/auth.js";

const ResultRouter = express.Router();

ResultRouter.post('/',auth,addResult);
ResultRouter.post('/update',auth,updateResult);
ResultRouter.get('/',auth,sendCSV);

export default ResultRouter;