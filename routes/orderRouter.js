import express from 'express';
import { createOrderController } from '../controllers/orderController.js';
import isLoggedIn from "../middlewares/isLoggedIn.js";

const orderRouter = express.Router();

orderRouter.post('/',isLoggedIn, createOrderController);

export default orderRouter;

