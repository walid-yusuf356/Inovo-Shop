import express from 'express';
import { createCouponController, getSingleCouponController ,getAllCouponsController, updateCouponController, deleteCouponController } from '../controllers/CouponController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post("/", isLoggedIn, createCouponController);
couponRouter.get("/", isLoggedIn, getAllCouponsController);
couponRouter.get("/:id", isLoggedIn, getSingleCouponController);
couponRouter.put("/update/:id", isLoggedIn, updateCouponController);
couponRouter.delete("/delete/:id", isLoggedIn, deleteCouponController);

export default couponRouter;