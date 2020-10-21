
//handling queries related to teacher

const express= require('express');
const teacherData=require('../model/teacherModel');
const teacherRouter=express.Router();

//creating teacher data
teacherRouter.post('/createTeacher', function(req,res){
    let data={  //capturing raw data from the request body
        name: req.body.name,
        employeeID: req.body.employeeID,
        subject: req.body.subject
    }
    let teacher= teacherData(data);
    teacher.save(); //saving to database
    res.send("Teacher data is saved to database");
})

//updating teacher data
teacherRouter.post('/updateTeacher', (req,res)=>
{
const id= req.body.id; ////capturing the teacher details from the request body
let data={
    name: req.body.name,
    employeeID: req.body.employeeID,
    subject: req.body.subject
}
teacherData.updateOne({_id:id},   //filter

    {
        $set:
        {
            name: data.name,
            employeeID: data.employeeID,
            subject:data.subject
        }
    }
    )

    .then((teacher)=>
    {
      res.send('updated one teacher record');
    }  )
    .catch((teacher)=>
    {
        res.send('😑 an error occurred');
    })

});

//to delete a teacher
teacherRouter.post('/deleteTeacher',(req,res)=>{
    const id=req.body.id;
    teacherData.deleteOne({_id:id})   //filter
    .then((teacher)=>
    {
      res.send('deleted one teacher record');
    }  )
    });


//to read the list of classes which a teacher is handling
teacherRouter.get('/classesHandledByOneTeacher/:employeeID', (req,res)=>
{
    let id=req.params.employeeID; //getting employee ID from the request
    teacherData.findOne({employeeID:id}, {classes:1, name:1, _id:0}) //looking for classes of a teacher
    .then(
        teacher=>{
            if(teacher!=null)
            {
                console.log("Found!");
                res.json({"employee ID":id, "Teacher":teacher.name, "Classes":teacher.classes});
            }
            else
            {
                console.log("No results!");
                res.send("No Result");

            }
        }
        )
            .catch(err=>{
                console.log("404");
            })
})

teacherRouter.get('/',(req,res)=> //set an api 
{
res.send("TACO FROM  TEACHER ROUTER")
});

module.exports=teacherRouter; //exporting the TEACHER ROUTER

