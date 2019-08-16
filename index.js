const express=require('express');
const connectDb=require('./config/db');
const app=express();
 app.use(express.json());
 //Define Routes
 app.use('/',require('./routes/index'));
 app.use('/api/url',require('./routes/url'));
 const PORT=5000;

 app.listen(PORT,()=>
 {

    console.log("Server Running 5000");
 })