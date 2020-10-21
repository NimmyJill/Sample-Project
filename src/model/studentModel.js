const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/INTERNSHIP');      //connecting mongodb database
                //database:mongodb , Port:27017(default) , database name::INTERNSHIP  
const Schema=mongoose.Schema;               //to define schema
const studentSchema=new mongoose.Schema(       //schema definition
                                    {
                                        name:String,
                                        rollNo:Number,
                                        mobNo:String,
                                        division: String
                                    
                                    }
                                    );
var studentData=mongoose.model('studentdata',studentSchema); //converting schema into a collection--model creation
                            //creation of "studentnode app.jsdatas" collection in the Database as an effect 
module.exports=studentData;