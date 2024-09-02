import Product from "../model/Product.js";
// import Category from "../model/Category.js";

// @desc Create a new product
// @route POST /api/products
// @access Private/Admin

// const createProductController = async (req, res) => {
//   const { name, description, category, sizes, colors, user, price, totalQty, brand } =
//     req.body;
//   // Product exists
//   const productExist = await Product.findOne({ name });
//     if (productExist) {
//     // find category
//     const categoryExists = await Category.findOne({ name: category });
//     }
//     if (!categoryExists) {
//       return res.json({
//       status: "fail",
//       message: "Category does not exist, please create a category first or check category name"
//     });
//   }

//     // create product
//     const product = await Product.create({
//         name,
//         description,
//         category,
//         sizes,
//         colors,
//         user: req.userAuthId,
//         price,
//         totalQty,
//         brand
//     });
//   // push the product into category
//   categoryExists.products.push(product._id);
//   // save the category
//   await categoryExists.save();
//   // send response
//   res.json({
//     status: "success",
//     msg: "Product created successfully",
//     data: product,
//   });
// }

const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    } = req.body;

    // Check if the product already exists
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({
        status: "fail",
        message: "Product already exists",
      });
    }

    // Find the category
    const categoryExists = await Category.findOne({ name: category });

    // If category doesn't exist, return an error
    if (!categoryExists) {
      return res.status(400).json({
        status: "fail",
        message:
          "Category does not exist, please create a category first or check the category name",
      });
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      category,
      sizes,
      colors,
      user: req.userAuthId,
      price,
      totalQty,
      brand,
    });

    // Push the product into the category's products array
    categoryExists.products.push(product._id);

    // Save the updated category
    await categoryExists.save();

    // Send response
    res.status(201).json({
      status: "success",
      msg: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "There was an error with the request",
    });
  }
};

// @desc Get all products to fetch all products
// @route GET /api/v1/products
// @access Private/Admin

const getProductsController = async (req, res) => {
  console.log(req.query);
  // query all products
  let productQuery = Product.find();

  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });
  }

  // search by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: {
        $regex: req.query.brand,
        $options: "i",
      },
    });
  }

  // search by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: {
        $regex: req.query.brand,
        $options: "i",
      },
    });
  }

  // search by colors
  if (req.query.category) {
    productQuery = productQuery.find({
      colors: {
        $regex: req.query.colors,
        $options: "i",
      },
    });
  }

  // search by sizes
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: {
        $regex: req.query.sizes,
        $options: "i",
      },
    });
  }
  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    //gte: greater than or equal to
    //lte: less than or equal to
    productQuery = productQuery.find({
      price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    });
  }

  // pagination
  // page
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  // startIdx
  const startIdx = (page - 1) * limit;
  // endIdx
  const endIdx = page * limit;
  // totalProducts
  const totalProducts = await Product.countDocuments();
  // product query
  productQuery = productQuery.skip(startIdx).limit(limit);

  // pagination results
  const pagination = {};
  if (endIdx < totalProducts) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIdx > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  // await the query
  const products = await productQuery;
  res.json({
    status: "success",
    totalProducts,
    results: products.length,
    pagination,
    message: "All products fetched successfully😁😁😁",
    data: products,
  });
};

// @desc Get a single product
// @route GET /api/products/:id
// @access Public

const getProductController = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error("Product not found");
  }
  res.json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
};

// @desc Update a product
// @route GET /api/products/:id/update
// @access Private/Admin

// update product
const updateProductController = async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  // update product
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  });
  res.json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
};

// @desc delete a product
// @route Delete /api/products/:id/delete
// @access Private/Admin

// delete product
const deleteProductController = async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  // delete product
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product deleted successfully",
  });
};

export {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
};
