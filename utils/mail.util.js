const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    // const transporter = nodemailer.createTransport({
    //   //host: process.env.HOST,
    //   service: 'gmail',
    //   port: 587,
    //   //secure: true,
    //   auth: {
    //     user: process.env.MAIL_USER,
    //     pass: process.env.MAIL_PASS,
    //   },
    // });
    var transporter = nodemailer.createTransport({
      host: process.env.HOST ,//"smtpout.secureserver.net",
      port: 587, // port for secure SMTP
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    
    console.log(error);
  }
};

module.exports = sendEmail;