import Color from "../model/Color.js";
// @desc Create a new color
// @route POST /api/v1/categories
// @access Private/Admin

const createColorController = async (req, res) => {
  try {
    const { name } = req.body;
    // Check if the color already exists
    console.log(req.userAuthId);
    const colorExists = await Color.findOne({ name });
    console.log(colorExists);
    if (colorExists) {
      return res.status(400).json({
        status: "fail",
        message: "color already exists",
      });
    }
    // Create a new color
    const color = await Color.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
    });
    res.status(201).json({
      status: "success",
      msg: "Color created successfully",
      data: color,
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

const getAllColorsController = async (req, res) => {
  const color = await Color.find();
  res.json({
    status: "success",
    msg: "Categories fetched successfully",
    data: color,
  });
};

// @desc Get a single color
// @route GET /api/categories/:id
// @access Public

const getSingleColorController = async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (color) {
    res.json({
      status: "success",
      msg: "color fetched successfully",
      data: color,
    });
  } else {
    res.status(404);
    throw new Error("color not found");
  }
};

// @desc Update a color
// @route PUT /api/colors/:id
// @access Private/Admin
const updateColorsController = async (req, res) => {
  const { name } = req.body;

  // update category
  const color = await Color.findByIdAndUpdate(req.params.id, {
    name,
  },
  { new: true });
  res.json({
    status: "success",
    msg: "color updated successfully",
    data: color,
  });
}

const deleteColorController = async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id);
  if (color) {
    res.json({
      status: "success",
      msg: "color deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("color not found");
  }
};

export {
  createColorController,
  getAllColorsController,
  getSingleColorController,
  updateColorsController,
  deleteColorController,
};
