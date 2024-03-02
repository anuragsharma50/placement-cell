import bcrypt from "bcrypt";
import { EmployeeModel } from "./employee.schema.js"

export const addEmployee = async (employeeDetails) => {
    try {
        const employee = new EmployeeModel(employeeDetails);
        employee.save();
        return { success:true,employee }
    } catch(err) {
        return { success:false,err }
    }
}

export const verifyEmployee = async (email,password) => {
    try {
        const employee = await EmployeeModel.findOne({email});
        if(!employee) {
            return { success:false,err:"Invalid credentials" }
        }

        const passwordCheck = await bcrypt.compare(password,employee.password);
        if(!passwordCheck) {
            return { success:false,err:"Invalid credentials" }
        }

        return { success:true,employee }
    } catch(err) {
        return { success:false,err }
    }
}