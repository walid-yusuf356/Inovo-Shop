// import Review from "../model/Review.js";

// @desc  create a review
// @route POST /api/reviews
// @access Private/Admin

const createReviewController = async (req, res) => {
    res.json({
        msg: "Review controller",
    });
}

export { createReviewController };