import express from "express";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import path from "path";

import EmployeeRouter from "./src/employee/employee.routes.js";
import InterviewRouter from "./src/interview/interview.routes.js";
import ResultRouter from "./src/result/result.routes.js";
import StudentRouter from "./src/student/student.routes.js";
import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { connectDB } from "./config/db.js";
import { auth } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views", path.join(path.resolve(),"src","views"));

app.use(ejsLayouts);

// routes
app.get('/',auth,(req,res,next) => {
    res.render("home");
})

app.use(express.static("src/views"));

app.use('/',EmployeeRouter);
app.use('/interviews',InterviewRouter);
app.use('/results',ResultRouter);
app.use('/students',StudentRouter);


// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, async () => {
    connectDB();
    console.log("Server is up and running on port", process.env.PORT);
})