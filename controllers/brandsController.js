import Brand from "../model/Brand.js";

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private/Admin
// const createBrandController = async (req, res) => {
//   try {
//     const { name } = req.body;
    
//     // Check if the brand already exists
//     const brandExists = await Brand.findOne({ name: name.toLowerCase() });
//     if (brandExists) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Brand already exists",
//       });
//     }

//     // Create a new brand
//     const brand = await Brand.create({
//       name: name.toLowerCase(),
//       user: req.userAuthId,
//     });
//     res.status(201).json({
//       status: "success",
//       msg: "Brand created successfully",
//       data: brand,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message || "There was an error with the request",
//     });
//   }
// };

const createBrandController = async (req, res) => {
  try {
    const { name } = req.body;
    // Check if the brand already exists
    const brandExists = await Brand.findOne({ name: name.toLowerCase() });
    if (brandExists) {
      return res.status(400).json({
        status: "fail",
        message: "Brand already exists",
      });
    }

    // Create a new brand, ensuring user is set
    const brand = await Brand.create({
      name: name.toLowerCase(),
      user: req.userAuthId,  // Ensure this is properly set
    });
    res.status(201).json({
      status: "success",
      msg: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Get all brands
// @route GET /api/v1/brands
// @access Public
const getAllBrandsController = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({
      status: "success",
      msg: "Brands fetched successfully",
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Get a single brand
// @route GET /api/v1/brands/:id
// @access Public
const getSingleBrandController = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }
    res.json({
      status: "success",
      msg: "Brand fetched successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Update a brand
// @route PUT /api/v1/brands/:id
// @access Private/Admin
const updateBrandsController = async (req, res) => {
  try {
    const { name } = req.body;

    // Update brand
    const brand = await Brand.findByIdAndUpdate(req.params.id, { name: name.toLowerCase() }, { new: true });

    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }

    res.json({
      status: "success",
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Delete a brand
// @route DELETE /api/v1/brands/:id
// @access Private/Admin
const deleteBrandController = async (req, res) => {
  try {
    // Find the brand by ID
    const brand = await Brand.findById(req.params.id);

    // Check if the brand exists
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }

    // Delete the brand
    await brand.deleteOne();

    res.json({
      status: "success",
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

export {
  createBrandController,
  getAllBrandsController,
  getSingleBrandController,
  updateBrandsController,
  deleteBrandController,
};
