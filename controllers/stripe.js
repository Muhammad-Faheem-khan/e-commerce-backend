
const STRIPE_SCRETE_KEY = process.env.STRIPE_SCRETE_KEY;
const stripe = require('stripe')(STRIPE_SCRETE_KEY)

exports.redirectToCheckout =  async (req, res)=>{
    try {
        const {products} = req.body
        const YOUR_DOMAIN = process.env.BASE_URL
        const line_items = products.map(product => ({
            price_data: {
                currency: 'USD', 
                product_data: {
                    name: product.name
                },
                unit_amount: product.value*100
            },
            quantity: product.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
          });
        
          res.json({session});
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
  
}