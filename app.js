import express from "express";
import Nodemailer from './Controller/Nodemailer.js';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get('/sendMail',Nodemailer);
const start=async()=>{
    try{
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
          });
    }catch{
        console.log("Error in connecting to the database");
    }
}

start();

