import nodeMailer from "nodemailer";

let adminEmail = "congchien1303@gmail.com";
let adminPassword = "Congchien133";
let mailHost = "smtp.gmail.com";
let mailPort = "587";

let sendMail = (to, subject,htmlContent) =>{
  let transporter = nodeMailer.createTransport({
    host : mailHost,
    port:mailPort,
    secure : false, //use SSL - TLS
    auth :{
      user : adminEmail,
      pass: adminPassword
    }
  });
  let options = {
    from : adminEmail,
    to: to,
    subject:subject,
    html:htmlContent
  }
  return transporter.sendMail(options);  //this defaunt return a promise
}

module.exports = sendMail;