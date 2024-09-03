import Product from "../model/Product.js";
import Review from "../model/Review.js";

// @desc  create a review
// @route POST /api/reviews
// @access Private/Admin

const createReviewController = async (req, res) => {
    const { product, message, rating } = req.body;
    // 1) find the product by id 
    const { productID } = req.params;
    const productExists = await Product.findById(productID).populate("reviews");
    if (!productExists) {
            throw new Error ("product not found");
    }
    // check if user has already reviewed this product
    const hasReviewed = productExists?.reviews?.find((review) => {
        return review?.user?.toString() === req?.userAuthId.toString();
    });
    // if user has already reviewed this product respond error on postman
    if (hasReviewed) {
        res.status(400);
        msg`You have already reviewed this product`;
    }
        
    // create a review
    const review = await Review.create({
        message,
        rating,
        user: req.userAuthId,
        product: productExists?._id,
    });
    // push the review into product Exists
    productExists.reviews.push(review?._id);
    // save the product
    await productExists.save();
    // send response
    res.status(201).json({
        status: "success",
        msg: "Review created successfully",
        data: review,
    });
}

// @desc  get all reviews
// @route GET /api/reviews
// @access Public

const getAllReviewsController = async (req, res) => {
    review = await Review.find();
    res.json({
        msg: "get all reviews controller",
        data: review,
    });
}

export { createReviewController, getAllReviewsController };