import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import Coupon from "../model/Coupon.js";

// @desc Create new order
// @route POST /api/orders
// @access Private

dotenv.config();

// stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

const createOrderController = async (req, res) => {
  // get the coupon code
  const { coupon } = req?.query;
  let couponFound = null;
  let discount = 0;

  if (coupon) {
    const couponFound = await Coupon.findOne({
      code: coupon?.toUpperCase(),
    });
    if (couponFound?.isExpired) {
      throw new Error("Coupon is expired");
    }
    if (!couponFound) {
      throw new Error("Coupon has not been found");
    }
    // get discount
    const discount = couponFound?.discount / 100;
  }

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
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
  });
  console.log(order);
  // console.log(order);
  // update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  // console.log(product);

  orderItems?.map(async (Order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === Order?._id?.toString();
    });
    if (product) {
      if (!isNaN(Order.qty)) {
        product.totalSold += Order.qty;
        await product.save();
      } else {
        console.error(
          `Invalid quantity for product ${product._id}: ${Order.qty}`
        );
      }
    }
  });
  // push the order into user
  user.orders.push(order?._id);
  await user.save();
  // convert order items to have same structure that stripe needs
  const convertedOrders = orderItems?.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item.qty,
    };
  });

  // make payment - stripe
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: { order_id: JSON.stringify(order?._id) },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  // send response
  res.send({ url: session.url });
};

// @desc get all orders
// @route GET /api/v1/orders
// @access Private

const getAllOrdersController = async (req, res) => {
  const orders = await Order.find();
  res.json({
    success: true,
    msg: "All orders",
    data: orders,
  });
};

// @desc get single order
// @route GET /api/v1/orders/:id
// @access Private

const getOrderController = async (req, res) => {
  // get the id from params
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) {
    throw new Error("Order not found");
  }
  res.status(200).json({
    success: true,
    msg: "Single Order",
    data: order,
  });
};

// @desc update order to delivered
// @route PUT /api/v1/orders/:id
// @access Private/Admin

const updateOrderController = async (req, res) => {
  // get the id from params
  const id = req.params.id;
  // update
  const UpdateOrder = await Order.findByIdAndUpdate(
    id,
    { status: req.body.status },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    msg: "Order updated",
    data: UpdateOrder,
  });
};

export {
  createOrderController,
  getAllOrdersController,
  getOrderController,
  updateOrderController,
};

// @desc get sales sum of orders
// @route GET /api/v1/orders/sum
// @access Private/Admin

const getOrderStatsController = async (req, res) => {
  
  // get order stats
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSales: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maxSales: {
          $max: "$totalPrice",
        },
        averageSales: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  // get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  // send response
  res.status(200).json({
    success: true,
    msg: "Sum of orders",
    data: orders,
    saleToday,
  });
};

export { getOrderStatsController };
