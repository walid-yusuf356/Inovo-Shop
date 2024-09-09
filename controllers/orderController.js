import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

// @desc Create new order
// @route POST /api/orders
// @access Private

const createOrderController = async (req, res) => {
    // get the payload(customer, orderItems, shippingAddress, paymentMethod, totalPrice)
    const { orderItems, shippingAddress, totalPrice } = req.body;
    // console.log(orderItems, shippingAddress, totalPrice);
    // the user
    const user = await User.findById(req.userAuthId);
    // check if user has shipping address
    if (!user?.hasShippingAddress) {
        throw new Error("Please add shipping address");
    }
    // check if order is not empty
    if (orderItems?.length <= 0) {
        throw new Error("No order items");
    }
    // place/create order - save into db
    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice,
    });
    // console.log(order);
    // update the product qty
    const products = await Product.find({_id: { $in: orderItems }});
    // console.log(product);

    orderItems?.map(async (Order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === Order?._id?.toString();
        });
        if (product) {
            if (!isNaN(Order.totalQtyBuying)) {
                product.totalSold += Order.totalQtyBuying;
                await product.save();
            } else {
                console.error(`Invalid quantity for product ${product._id}: ${Order.totalQtyBuying}`);
            }
        }
    });
    // push the order into user
    user.orders.push(order?._id);
    await user.save();
    res.status(201).json({
        status: "success",
        msg: "Order created successfully",
        data: order,
    });
    // make payment - stripe

    // Payment webhook

    // update the user order
}

export { createOrderController };