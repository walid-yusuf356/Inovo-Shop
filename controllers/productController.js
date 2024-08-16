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
  console.log(req.query);
  // query all products
  let productQuery = Product.find();

  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({ 
      name: {
        $regex: req.query.name,
        $options: "i"
      }, 
    });   
  }

  // search by brand
  if (req.query.brand) {
    productQuery = productQuery.find({ 
      brand: {
        $regex: req.query.brand,
        $options: "i"
      }, 
    });   
  }

   // search by category
   if (req.query.category) {
    productQuery = productQuery.find({ 
      category: {
        $regex: req.query.brand,
        $options: "i"
      }, 
    });   
  }
  
    // search by colors
    if (req.query.category) {
      productQuery = productQuery.find({ 
        colors: {
          $regex: req.query.colors,
          $options: "i"
        }, 
      });   
    }

   // search by sizes
   if (req.query.sizes) {
    productQuery = productQuery.find({ 
      sizes: {
        $regex: req.query.sizes,
        $options: "i"
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
        $lte: priceRange[1]
      },
      }
    );
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
}

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
}




export { createProductController, getProductsController, getProductController };
