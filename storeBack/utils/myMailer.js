const nodemailer = require("nodemailer");
const config = require("config");

async function myMailer(emailTo, emailSubject, emailText = "", emailHtml = "") {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: config.get("email.EMAIL_SERVICE"),
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
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve(true);
      }
    });
  });
}

module.exports = myMailer;
