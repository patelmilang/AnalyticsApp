const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      //host: process.env.HOST,
      service: 'gmail',
      port: 587,
      //secure: true,
      auth: {
        user: 'patelmilang@gmail.com',
        pass: 'ashufxnzevftgthl',
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;