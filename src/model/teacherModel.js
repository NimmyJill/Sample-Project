const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/INTERNSHIP');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::INTERNSHIP  
const Schema=mongoose.Schema;               //to define schema
const teacherSchema=new mongoose.Schema(       //schema definition
                                    {
                                     name:String,
                                     employeeID:Number,
                                     subject:String,
                                     classes: Array
                                    }
                                    );
var teacherData=mongoose.model('teacherdata',teacherSchema); //converting schema into a collection--model creation
                            //creation of "teacherdatas" collection in the Database as an effect 
module.exports=teacherData;