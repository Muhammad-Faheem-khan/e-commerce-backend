const {orderConfirmation }= require('../emailTemplates/orderEmail')

exports.generateEmailBody = (data) => {
    const message = {
        from: process.env.OWNER_MAIL, 
        // to: data.sellerId.email, 
        to: 'fimukhan79@gmail.com',
        subject: "Order Confirmed",
        html: orderConfirmation(data), 
        }
    return message
}
