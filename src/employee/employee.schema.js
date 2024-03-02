import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter employee's name"]
    },
    email: {
        type: String,
        required: [true,"Please enter employee's email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please enter employee's password"]
    }
})

export const EmployeeModel = mongoose.model("employee",employeeSchema);
