import express from "express";
import { getLogin, getRegister, signin, signout, signup } from "./employee.controller.js";

const EmployeeRouter = express.Router();

EmployeeRouter.get('/signin',getLogin);
EmployeeRouter.get('/signup',getRegister);
EmployeeRouter.get('/signout',signout);
EmployeeRouter.post('/signup',signup);
EmployeeRouter.post('/signin',signin);

export default EmployeeRouter;