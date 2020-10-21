
//handling queries related to student

const express= require('express');
const studentData=require('../model/studentModel');
const studentRouter=express.Router();

//creating student data
studentRouter.post('/createStudent', function(req,res){
    let data={                           //capturing raw data from the request body
        name: req.body.name,
        rollNo: req.body.rollNo,
        mobNo: req.body.mobNo,
        division: req.body.division
    }
    let student= studentData(data);
    student.save();                      //saving to database
    res.send("Student data is saved to database");
})

//updating student data
studentRouter.post('/updateStudent', (req,res)=>
{
const id= req.body.id;                   //capturing the student details from the request body
let data={
    name: req.body.name,
    rollNo: req.body.rollNo,
    mobNo: req.body.mobNo
}
studentData.updateOne({_id:id},           //filter

    {
        $set:
        {
            name:data.name,
            rollNo:data.rollNo,
            mobNo:data.mobNo
        }
    }
    )

    .then((student)=>
    {
      res.send('updated one student record');
    }  )
    .catch((student)=>
    {
        res.send('😑 an error occurred');
    })

});

//to delete a student
studentRouter.post('/deleteStudent',(req,res)=>{
    const id=req.body.id;
    studentData.deleteOne({_id:id})              //filter
    .then((student)=>
    {
      res.send('deleted one student record');
    }  )
    });

//reading the list of students in a division
studentRouter.get('/divisionWiseStudentList/:division', (req,res)=>{
let division=req.params.division;
studentData.find({division:division})
.then(list=>
    {
        if(list){           //if some details available
            console.log("List is ready!!");
            res.json({"division":division,"List": list});
        }
        else{               // //if no details available
            res.send("OOPs!! No results found");
        }
    })
    .catch(err=>{     //error
        console.log("404");
    });
})

studentRouter.get('/',(req,res)=>               //set an api 
{
res.send("TACO FROM STUDENT ROUTER")
});


module.exports=studentRouter;                   //exporting the STUDENT ROUTER