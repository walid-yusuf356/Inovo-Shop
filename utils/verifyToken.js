import jwt from 'jsonwebtoken';
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return "Token expired or invalid";
    } else {
      return decoded;
    }
  });
} 

export default verifyToken;