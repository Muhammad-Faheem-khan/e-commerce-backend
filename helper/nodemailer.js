const nodemailer = require('nodemailer')

exports.sendEmail = async (message, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          pass: process.env.OWNER_PASSWORD,
          user: process.env.OWNER_MAIL,
        },
      });

    await transporter.sendMail(message)
    .then(() =>{
      res.status(200).json({message: 'You will received an email'})
    })
    .catch((error) => res.status(200).json({message: error.message}))     

}



