import express from "express";
import { addStudent, getAddStudentPage, getStudentById, getStudents } from "./student.controller.js";
import { auth } from "../../middleware/auth.js";

const StudentRouter = express.Router();

StudentRouter.get('/',auth,getStudents);
StudentRouter.get('/add-student',auth,getAddStudentPage);
StudentRouter.post('/',auth,addStudent);
StudentRouter.get('/:studentId',auth, getStudentById);

export default StudentRouter;