import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import verfyToken from "../utils/verifyToken.js";

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Private/Admin

const registerUserController = async (req, res) => {
  //   res.json({
  //     msg: "Register a new user controller",
  //   });
  const { fullname, email, password } = req.body;
  // check user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    // 400 Bad Request
    return res.json({
      msg: "User already exists",
    });
  }

  // check if password is less than 6 characters
  if (password.length < 6) {
    return res.json({
      message: "Password must be at least 6 characters",
    });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  return res.status(201).json({
    status: "success",
    msg: "User registered successfully",
    data: user,
  });
};

// Login user
// @route POST /api/v1/users/login
// @access Public

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  // check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required information",
    });
  }

  // check if user exists in db by email
  const userFound = await User.findOne({ email });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    return res.status(200).json({
      status: "success",
      msg: "User logged in successfully",
      data: userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    return res.status(400).json({
      status: "fail",
      msg: "Invalid email or password. You are not authorized to login",
    });
  }
};

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private

const profileUserController = async (req, res) => {
  const token = getTokenFromHeader(req);
  // verify token
  const verified = verfyToken(token);
  console.log(req);
  res.json({
    msg: "Welcome Profile Page",
  });
};

// @desc Update user shipping address
// @route PUT /api/v1/users/update/shipping
// @access Private

const updateShippingAddressController = async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone } = req.body;
  // get the user
  const user = await User.findByIdAndUpdate(req.userAuthId, {
    shippingAddress: {
            firstName,
            lastName,
            address,
            city,
            postalCode,
            province,
            phone,
          }, 
          hasShippingAddress: true,
  },

  { new: true }
  );
  // send response
  res.json({
    status: "success",
    msg: "Shipping address updated successfully",
    data: user, 
  });
};

export { registerUserController, loginUserController, profileUserController, updateShippingAddressController };
