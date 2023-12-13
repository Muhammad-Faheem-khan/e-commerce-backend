const nodemailer = require('nodemailer')

exports.sendEmail = async (message, res) => {
    const testAccount = await nodemailer.createTestAccount()

    console.log(testAccount)
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

    transporter.sendMail(message)
    .then((info) =>{
        console.log(nodemailer.getTestMessageUrl(info))
        res.status(200).json({
        message: 'You will received an email',
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
    })}
    )
    .catch((error) => res.status(200).json({message: error.message}))     

}



