import Product from "../model/Product.js";

// @desc Create a new product
// @route POST /api/products
// @access Private/Admin

const createProductController = async (req, res) => {
  const { name, description, category, sizes, colors, user, price, totalQty, brand } =
    req.body;
  // Product exists
  const productExist = await Product.findOne({ name });
    if (productExist) 
    {
       throw new Error("Product already exists");
    }
    // create product
    const product = await Product.create({
        name, 
        description, 
        category, 
        sizes, 
        colors, 
        user: req.userAuthId, 
        price, 
        totalQty,
        brand
    });
  // push the product into category
  // send response
  res.json({
    status: "success",
    msg: "Product created successfully",
    data: product,
  });
}

// @desc Get all products to fetch all products
// @route GET /api/v1/products
// @access Private/Admin

const getProductsController = async (req, res) => {
  // query all products
  let productQuery = Product.find();
  console.log(productQuery);
  const products = await Product.find({});
  res.json({
    status: "success",
    data: products,
  });
}

export { createProductController, getProductsController };
