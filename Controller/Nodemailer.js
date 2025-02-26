// app.js->
import nodemailer from "nodemailer";
// create an SMTP server
const Nodemailer = async (req, res) => {
  // Your email sending logic
  let testAccount = await nodemailer.createTestAccount();
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "abigail.cruickshank16@ethereal.email",
      pass: "pyhSdkXh9Zmr54EEbH",
    },
  });

  let info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: "akhil788@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  res.json(info);
};
export default Nodemailer;
