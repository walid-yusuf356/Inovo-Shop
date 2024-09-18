import express from 'express';
import { createCategoryController, getAllCategoriesController, getSingleCategoryController, updateCategoriesController, deleteCategoryController } from '../controllers/categoriesController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import CategoryFileUpload from '../config/categoryFileUpload.js';

const categoriesRouter = express.Router();

// http method to handle category creation route and pass it to the createCategoryController
categoriesRouter.post("/", isLoggedIn, CategoryFileUpload.single("file"), createCategoryController);
// http method to handle category fetching route and pass it to the getCategoriesController
categoriesRouter.get("/", getAllCategoriesController);
// http method to handle single category fetching route and pass it to the getSingleCategoryController
categoriesRouter.get("/:id", getSingleCategoryController);
// http method to handle category update route and pass it to the updateCategoriesController
categoriesRouter.put("/:id", isLoggedIn, updateCategoriesController);
// http method to handle category deletion route and pass it to the deleteCategoryController
categoriesRouter.delete("/:id", isLoggedIn, deleteCategoryController);

export default categoriesRouter;