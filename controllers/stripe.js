
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

        // const paymentMethod = await stripe.paymentMethods.create({
        //     type: 'card',
        //     card: {
        //         number: '4242424242424242',
        //         exp_month: 8,
        //         exp_year: 2026,
        //         cvc: '314',
        //     },
        //     });

        // console.log('payment method', paymentMethod)
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
          });
        
          res.json({session});
    }catch (error) {
        console.log('error', error)
        res.status(400).json({ message: error.message });
    }
  
}


exports.redirectToPayment =  async (req, res)=>{
    try {
        const calculateOrderAmount = (items) => {
            // Calculate total value
        let totalValue = 0;

        items.forEach(item => {
        totalValue += item.value * item.quantity;
        });
        return totalValue
        };
        
        const { items } = req.body;

        console.log('items', items)
    
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
        });
    
        res.send({
        clientSecret: paymentIntent.client_secret,
        });
    }catch (error) {
        console.log('error', error)
        res.status(400).json({ message: error.message });
    }
  
}
