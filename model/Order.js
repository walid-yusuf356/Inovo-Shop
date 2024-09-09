import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNum = Math.floor(1000 + Math.random() * 90000);
const OrderSchema = new Schema( {
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            
                type: Object,
                required: true,
        },
    ], 
    shippingAddress: {
        type: Object,
        required: true,
    },
    orderNumber:{
        type: String,
        required: true,
        default: randomTxt + randomNum,
    },
    // for stripe payment
    paymentStatus: {
        type: String,
        required: true,
        default: "Not Paid",
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "Not specified",
    },
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    currency: {
        type: String,
        required: true,
        default: "Not specified",
    },
    // for admin
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    },
    deliveredAt: {
        type: Date,
    },
},
{
    timestamps: true,
}
);

// compile to form model
export default mongoose.model("Order", OrderSchema);