import { StudentModel } from "./student.schema.js"

export const addStudentToDB = async (student) => {
    try{
        const newStudent = new StudentModel(student)
        await newStudent.save();
        return {success:true,student:newStudent};
    } catch(err) {
        return {success:false,err};
    }
}

export const getStudentsFromDB = async () => {
    try{
        const students = await StudentModel.find({});
        // const students = await StudentModel.find({}).sort({studentDetails:{name:1}});
        return {success:true,students};
    } catch(err) {
        return {success:false,err};
    }
}

export const getStudentByIdFromDB = async (studentId) => {
    try{
        const student = await StudentModel.findOne({studentDetails:{studentId}});
        return {success:true,student};
    } catch(err) {
        return {success:false,err};
    }
}