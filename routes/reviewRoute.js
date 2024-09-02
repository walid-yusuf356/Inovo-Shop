import express from 'express';
import { createReviewController } from '../controllers/reviewController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

const reviewRouter = express.Router();

reviewRouter.post("/", isLoggedIn, createReviewController);

export default reviewRouter;