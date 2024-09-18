import dotenv from "dotenv";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import productRoutes from "../routes/productRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRoute.js"; 
import orderRouter from "../routes/orderRouter.js"; 
import Stripe from "stripe";
import express from 'express';
import order from "../model/Order.js";
import couponsRouter from "../routes/couponRouter.js";
import upload from '../config/fileUpload.js'; 


dotenv.config();

// db connect
dbConnect();
const app = express();

// stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "your_endpoint_secret";

app.post('/webhook', express.raw({type: 'application/json'}), 
async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log('Error', err.message);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
if (event.type === 'checkout.session.completed') {
    // update the order status
    const session = event.data.object;
    const { orderId } = session.metadata;
    const paymentStatus = session.payment_status;
    const PaymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    console.log({
        orderId,
        paymentStatus,
        PaymentMethod,
        totalAmount,
        currency,
    }
    );
    // find order 
    const order = await order.findByIdAndUpdate(JSON.parse(orderId), 
        {
            totalPrice: totalAmount / 100,
            currency,
            PaymentMethod,
            paymentStatus,
        },{
            new: true,
        }
    );
    console.log(order);
} else {
    return;
}

    // // Handle the event
    // switch (event.type) {
    //     case 'payment_intent.succeeded':
    //         // const paymentIntentSucceeded = event.data.object;
    //         // Then define and call a function to handle the event payment_intent.succeeded
    //         break;
    //     // ... handle other event types
    //     default:
    //         console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});
// Middlewares
app.use(express.json()); 


// routes middleware to parse the request body and pass it to the userRoutes
app.use("/api/v1/users/", userRoutes);
// routes middleware to parse the request body and pass it to the productRoutes
app.use("/api/v1/products/", productRoutes);
// routes middleware to parse the request body and pass it to the categoriesRouter
app.use("/api/v1/categories/", categoriesRouter);
// routes middleware to parse the request body and pass it to the brandsRouter
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/colors/", colorRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/coupons/", couponsRouter);



export default app;
