const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/INTERNSHIP');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::INTERNSHIP  
const Schema=mongoose.Schema;               //to define schema
const classSchema=new mongoose.Schema(       //schema definition
                                    {
                                    standard:Number,
                                    division:Array
                                    
                                    }
                                    );
var classData=mongoose.model('classdata',classSchema); //converting schema into a collection--model creation
                            //creation of "classdatas" collection in the Database as an effect 
module.exports=classData;