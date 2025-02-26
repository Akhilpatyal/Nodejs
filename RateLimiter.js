// Rate Limiter: Implement a simple rate limiter in Express.js that limits users to 5 requests per minute from the same IP address.
// 1-> express require
// 2-> server creation
// 3-> create a rate limiter middleware
// 4-> create a route
// 5-> collect ip and date
// 6-> create time span
// 7-> check if ip is in the list with the same time span
// 8-> if not add ip to the list
// 9-> if yes check if the limit is reached

//  code
import express from "express";
const app = express();
const port = 3000;

const timespan = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  console.log(ip);

  const now = Date.now();
  console.log(now);

  if (!timespan[ip]) {
    timespan[ip] = {
      count: 1,
      time: now,
    };
  } else {
    const timediff = (now - timespan[ip].time) / 1000; //comvert in seconds;
    if (timediff < 60) {
      if (timespan[ip].count < 5) {
        timespan[ip].count++;
      } else {
        console.log("you have exceeded the limit of 5 requests in a minute");
        
        return res
          .status(429)
          .send("you have exceeded the limit of 5 requests in a minute");
      }
    } else {
      timespan[ip] = {
        count: 1,
        time: now,
      };
    }
  }

  next();
};

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.end(
    "this is a ratelimiter page so you can only access this page 5 times in a minute"
  );
});

app.listen(port, () => {
  console.log(`your server is running on port ${port}`);
});
