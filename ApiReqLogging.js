import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

const filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filepath);
//  collect path
const logfile = path.join(__dirname, "log.text");
// function
const getLog = (req, res, next) => {
  // main content
  const now = new Date(); //  start time request
  // console.log(now);

  res.on("finish", () => {
    const end = new Date();
    const excutiontime = end - now;
    // console.log(excutiontime);
    // logs
    const executionLogs = `${new Date()} ${req.method} ${
      req.url
    } ${excutiontime} ms ${req.protocol}`;
    // console.log(executionLogs);
    fs.appendFile(logfile, executionLogs + "\n", (err) => {
      if (err) {
        console.log(err);
      }
      console.log("log file created");
    });
  });
  // end
  next();
};

// middleware
app.use(getLog);
// route
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/About", (req, res) => {
  res.send("About us page");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// Implement a middleware in Express.js that logs incoming requests (method, URL, timestamp) to a file and console. Store logs in a file using fs module. log request execution time in the console.
