const nodemailer = require('nodemailer')
const {generateEmailBody} = require('../utils/emailBody')

exports.sendEmail = async (orderData, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          pass: process.env.OWNER_PASSWORD,
          user: process.env.OWNER_MAIL,
        },
      });

      const message = generateEmailBody(orderData)
    await transporter.sendMail(message)
    .then(() =>{
      res.status(200).json({message: 'Order Confirmed.'})
    })
    .catch((error) => res.status(200).json({message: error.message}))     
}



