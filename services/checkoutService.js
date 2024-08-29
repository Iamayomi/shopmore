const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { Product, Cart, CartItem } = require("../models/index");
const AppError = require('../utils/appError');


exports.checkoutSession = async function (req, res, next) {

	try {

  		const product = await Product.findByPk(req.params.productId * 1);
	
        const productdetails = await stripe.products.create({
			name: product.name,
			description: `payment for ${product.name}`,
			image: product.image
		});

		const productPrice = await stripe.prices.create({
			product: productdetails.id,
			unit_amount: product.price * 100,
            currency: 'usd',
		});

		const checkoutProduct = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			success_url: `${req.protocol}://${req.get('host')}/shopmore/success.html`,
       		cancel_url: `${req.protocol}://${req.get('host')}/shopmore/user/cancel.html`,
       		customer_email: req.user.email,
       		client_reference_id: req.params.id,
            mode: 'payment',
            currency: 'usd',
            line_items: [{ price: productPrice.id, quantity: req.body.quantity * 1 }]
			  
		 });


		res.status(200).json({
        	status: "Success",
           	checkoutProduct
	   	});

	} catch(err){
	 	switch(err.type){
		case 'StripeCardError':
   		   next(new AppError(`${err.message}`, 400));
   		   break;

		case 'StripeRateLimitError':
   		   next(new AppError(`${err.message}`, 429));
   		   break;

		case 'StripeInvalidRequestError':
   		   next(new AppError(`${err.message}`, 400));
   		   break;

		case 'StripeAPIError':
   		   next(new AppError(`${err.message}`, 400));
   		   break;

		case 'StripeConnectionError':
   		   next(new AppError(`${err.message}`, 402));
   		   break;

		case 'StripeAuthecationError':
   		   next(new AppError(`${err.message}`, 403));
   		   break;

		default:
   		   next(new AppError(`${err.message}`, 400));
   		   break; 		
		}
	}
};



exports.webhookCheckout = (req, res, next) => {
    const signature = req.headers['stripe-signature'];
	
	let event;
	try {
	    event = stripe.webhooks.constructEvent(req.body, signature);
	} catch(err){
		return next(res.status(400).send(`webhook error: ${err.message}`));
	};
	
	
	if(event.type === 'checkout.session.completed'){
		const session = event.data.object;
		console.log(session)
	}
	
	res.status(200).json({ received: true });
};
