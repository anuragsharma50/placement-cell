import bcrypt from "bcrypt";
import { sendToken } from "../../utils/sendToken.js";
import { addEmployee, verifyEmployee } from "./employee.repository.js";

export const getRegister = (req,res) => {
    res.render('signup');
}

export const getLogin = (req,res) => {
    res.render('signin', {error:null});
}

export const signup = async (req,res,next) => {
    const {name,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,12);
    const resp = await addEmployee({name,email,password:hashedPassword});
    if(resp.success){
        res.locals.userId = resp.employee._id;
        sendToken(resp.employee,res,201);
    }
    else{
        console.log(resp.err);
    }
}

export const signin = async (req,res,next) => {
    const {email,password} = req.body;
    const resp = await verifyEmployee(email,password);
    if(resp.success){
        res.locals.userId = resp.employee._id;
        sendToken(resp.employee,res,200);
    }
    else{
        console.log(resp.err);
        res.render('signin', {error:resp.err});
    }
}

export const signout = async (req,res,next) => {
    res.status(200).cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.locals.userEmail = null;
    res.render('signin', {error:null});
}
