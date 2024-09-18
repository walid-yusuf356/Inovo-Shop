
import Coupon from "../model/Coupon.js";
// @desc create new Coupon
// @route POST /api/v1/coupons
// @access Private/Admin

const createCouponController = async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    // check if admin

    // check if coupon already exists
    const couponsExists = await Coupon.findOne({ code,
    });
    if (couponsExists) {
        return res.status(400).json({
            status: "fail",
            message: "Coupon already exists",
        });
    }
    // check if discount is a number
    if (isNaN(discount)) {
        return res.status(400).json({
            status: "fail",
            message: "Discount must be a number",
        });
    }
    // Create a new coupon
    const coupon = await Coupon.create({
        code: code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    // send response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        data: coupon,
    });
};

// @desc Get all coupons
// @route GET /api/v1/coupons
// @access Private/Admin

const getAllCouponsController = async (req, res) => {
    const coupons = await Coupon.find();
    res.json({
        status: "success",
        message: "All coupons",
        data: coupons,
    });
};

// @desc Get a single coupon
// @route GET /api/v1/coupons/:id
// @access Private/Admin

const getSingleCouponController = async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
        res.json({
            status: "success",
            message: "Coupon fetched successfully",
            data: coupon,
        });
        if (!coupon) {
            res.status(404).json({
                status: "fail",
                message: "Coupon not found",
                data: coupon,
            });
        }

};

// @desc Update a coupon
// @route PUT /api/v1/coupons/:id
// @access Private/Admin

const updateCouponController = async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(
        req.params.id,
        {
            code: code?.toUpperCase(),
            startDate,
            endDate,
            discount,
        },
        {
            new: true,
        }
    );
    res.json({
        status: "success",
        message: "Coupon updated successfully",
        data: coupon,
    });
};

// @desc delete a coupon
// @route DELETE /api/v1/coupons/:id
// @access Private/Admin

const deleteCouponController = async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (coupon) {
        res.json({
            status: "success",
            message: "Coupon deleted successfully",
            data: coupon,
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Coupon not found",
            data: coupon,
        });
    }
}

export { createCouponController, getAllCouponsController, updateCouponController, deleteCouponController, getSingleCouponController };
