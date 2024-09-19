import express from 'express';
import { createCouponController, getSingleCouponController ,getAllCouponsController, updateCouponController, deleteCouponController } from '../controllers/CouponController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const couponRouter = express.Router();

couponRouter.post("/", isLoggedIn, isAdmin, createCouponController);
couponRouter.get("/", isLoggedIn, getAllCouponsController);
couponRouter.get("/:id", isLoggedIn, getSingleCouponController);
couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCouponController);
couponRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponController);

export default couponRouter;