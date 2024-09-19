import express from 'express';
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { createOrderController, getAllOrdersController, getOrderController, updateOrderController, getOrderStatsController } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn, createOrderController);
orderRouter.get('/',isLoggedIn, getAllOrdersController);
orderRouter.get('/:id',isLoggedIn, getOrderController);
orderRouter.put('/:id',isLoggedIn, updateOrderController);
orderRouter.get('/sales/stats',isLoggedIn, getOrderStatsController);

export default orderRouter;

