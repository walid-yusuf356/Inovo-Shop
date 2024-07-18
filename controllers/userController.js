import User from "../model/User.js";

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Private/Admin

const registerUser = async (req, res) => {
//   res.json({
//     msg: "Register a new user controller",
//   });
const {fullname, email, password } = req.body;
// check user exists 
const userExist = await User.findOne({ email });
if(userExist){
    // 400 Bad Request
    res.json({
        msg: "User already exists",
});  
// hash password
// create the user

const user = await User.create({
    fullname,
    email,
    password,
});
res.json({
    status: "success",
    msg: "User registered successfully",
    data: user,
});
};
}


export { registerUser };
