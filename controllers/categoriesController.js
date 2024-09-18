import Category from "../model/Category.js";

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private/Admin

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    // Check if the category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({
        status: "fail",
        message: "Category already exists",
      });
      }
      console.log(req.userAuthId);
    // Create a new category
    const category = await Category.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
      image: req.file.path,
    });
    res.status(201).json({
      status: "success",
      msg: "Category created successfully",
      data: category,
    });
  } catch (error) {
    // Catch any errors and return a 500 status with an error message
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Get all categories
// @route GET /api/categories
// @access Public

const getAllCategoriesController = async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    msg: "Categories fetched successfully",
    data: categories,
  });
};

// @desc Get a single category
// @route GET /api/categories/:id
// @access Public

const getSingleCategoryController = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json({
      status: "success",
      msg: "Category fetched successfully",
      data: category,
    });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
};

// @desc Update a category
// @route PUT /api/categories/:id
// @access Private/Admin
const updateCategoriesController = async (req, res) => {
  const { name } = req.body;

  // update category
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name,
  });
  // If the category doesn't exist, return an error
  if (!category) {
    res.status(404);
    return res.json({
      status: "fail",
      message: "Category not found",
    });
  }

  res.json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
};

const deleteCategoryController = async (req, res) => {
  try {
    // Find the category by ID
    const category = await Category.findById(req.params.id);

    // Check if the category exists
    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    // Delete the category
    await category.deleteOne();

    // Send success response
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    // Catch any errors and return a 500 status with an error message
    res.status(500).json({
      status: "error",
      message: "There was an error with the request or id",
    });
  }
};

export {
  createCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoriesController,
  deleteCategoryController,
};
