
//handling queries related to class

const express= require('express');
const classData=require('../model/classModel');
const classRouter=express.Router(); //router instance of classRouter

//creating a class details
classRouter.post('/createClass', function(req,res){
    let data={                          //capturing raw data from the request body
        standard: req.body.standard,
        division: req.body.division
    }

    let clas = classData(data);  //mapping to schema
    clas.save(); //saving to database
    res.send("A class is saved to database");
})

//updating a class details
classRouter.post('/updateClass', (req,res)=>
{
const std= req.body.standard; ////capturing the class details from the request body
let data={
    standard: req.body.standard,
    division: req.body.division
}
classData.updateOne({standard:std}, //filter

    {
        $set:
        {
            standard:data.standard,
            division:data.division
        }
    }
    )

    .then((clas)=>
    {
      res.send('Updated a class record');
    }  )
    .catch((clas)=>
    {
        res.send('error occurred');
    })

});

//to delete a class
classRouter.post('/deleteClass',(req,res)=>{
    const std=req.body.standard;
    classData.deleteOne({standard:std})  //filter
    .then((clas)=>
    {
      res.send('deleted a class');
    }  )
    });

//to read the divisions of each standard
classRouter.get('/divisionsOfStandards/:std', (req,res)=>
{
    let std=req.params.std;    //getting the standard from the URL
    classData.findOne({standard:std}, {_id:0, division:1})
    .then(division=>
        {
            if(division!=null){
                console.log("Found!!");
                res.json({"standard":std, "divisions":division.division})
            }
            else
            {
                console.log("No results found!!");
                res.send("NO RESULTS");
            }
        })
    .catch(err=>
        {
            console.log("404");
        })
})

classRouter.get('/',(req,res)=> //set an api 
{
res.send("TACO FROM CLASS ROUTER")
});

module.exports=classRouter; //exporting the CLASS ROUTER