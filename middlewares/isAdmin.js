import User from "../model/User.js";

// check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // find the login user
    const user = await User.findById(req.userAuthId);
    
    // check if the user exists
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // check if the user is an admin
    if (user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Access denied. You are not authorized");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default isAdmin;