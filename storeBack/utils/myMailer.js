const nodemailer = require("nodemailer");
const config = require("config");

function myMailer(emailTo, emailSubject, emailText = "", emailHtml = "") {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("email.EMAIL_USERNAME"),
      pass: config.get("email.EMAIL_PASSWORD"),
    },
  });

  const options = {
    from: config.get("email.EMAIL_SENDER"),
    to: emailTo,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    else console.log(info);
  });
}

module.exports = myMailer;
