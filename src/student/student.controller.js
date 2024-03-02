import { addStudentToDB, getStudentByIdFromDB, getStudentsFromDB } from "./student.repository.js"; 

export const getAddStudentPage = (req,res,next) => {
    res.render('addStudent',{error:null});
}

export const addStudent = async (req,res,next) => {
    const {batch,studentId,name,college,status,DSAFinalScore,webDFinalScore,reactFinalScore} = req.body;
    const studentDetails = {studentId,name,college,status};
    const coursesScore = { DSAFinalScore,webDFinalScore,reactFinalScore };
    const resp = await addStudentToDB({batch,studentDetails,coursesScore});
    if(resp.success) {
        // res.status(201).json({success: true,res:resp.student});
        res.redirect("/students/")
    }
    else{
        console.log(resp.err);
    }
}

export const getStudents = async (req,res,next) => {
    const resp = await getStudentsFromDB();
    if(resp.success) {
        // res.status(201).json({success: true,res:resp.students});
        res.render('students',{students: resp.students});
    }
    else{
        console.log(resp.err);
    }
}

export const getStudentById = async (req,res,next) => {
    const studentId = req.params.studentId;
    const resp = await getStudentByIdFromDB(studentId);
    if(resp.success) {
        res.status(201).json({success: true,res:resp.student});
    }
    else{
        console.log(resp.err);
    }
}