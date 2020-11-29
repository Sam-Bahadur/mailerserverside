const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); //importing node mailer
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Go to /sendemail and send a post request for sending emails");
});
app.post("/sendemail", (req, res, next) => {
  console.log(req.body);
  const { name, email, phone, message } = req.body;
  /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
      here we are using gmail as our service 
      In Auth object , we specify our email and password
    */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `pradipktimsina@gmail.com`, //replace with your email
      pass: `vpnoiyrt3964`, //replace with your password
    },
  });

  /*
      In mail options we specify from and to address, subject and HTML content.
      In our case , we use our personal email as from and to address,
      Subject is Contact name and 
      html is our form details which we parsed using bodyParser.
    */
  const mailOptions = {
    from: "timsinakausila@gmail.com", //replace with your email
    to: "pradipktimsina@gmail.com", //replace with your email
    subject: `Contact name: ${name}`,
    html: `<h1>Contact details</h1>
            <h2> Name:${name} </h2><br>
            <h2> Email:${email} </h2><br>
            <h2> Phone Number:${phone} </h2><br>
            <h2> Message:${message}</h2><br>`,
  };

  /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
     call back as parameter 
    */

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("error"); // if error occurs send error as response to client
    } else {
      console.log("Email sent: " + info.response);
      res.send("Sent Successfully"); //if mail is sent successfully send Sent successfully as response
    }
  });
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
