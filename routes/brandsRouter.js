import express from 'express';
import { createBrandController, getAllBrandsController, getSingleBrandController, updateBrandsController, deleteBrandController } from '../controllers/brandsController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const brandsRouter = express.Router();

// http method to handle brand creation route and pass it to the createBrandController
brandsRouter.post("/", isLoggedIn, isAdmin, createBrandController);
// http method to handle brand fetching route and pass it to the getBrandsController
brandsRouter.get("/", getAllBrandsController);
// http method to handle single brand fetching route and pass it to the getSingleBrandController
brandsRouter.get("/:id", getSingleBrandController);
// http method to handle brand update route and pass it to the updateBrandsController
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrandsController);
// http method to handle brand deletion route and pass it to the deleteBrandController
brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrandController);

export default brandsRouter;