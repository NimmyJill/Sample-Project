const express = require("express");
const bodyparser=require("body-parser");
const app = new express();

//importing router modules
const classRouter = require("./src/routes/classRouter");
const studentRouter = require("./src/routes/studentRouter");
const teacherRouter = require("./src/routes/teacherRouter");

app.use(bodyparser.json());

//creating request specific routes
app.use("/class", classRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);


//route request handler

app.get('/', function(req,res){
    res.send("Hello World");
});
app.listen(5000);