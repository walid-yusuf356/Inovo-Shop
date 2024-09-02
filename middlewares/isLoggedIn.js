import getTokenFromHeader from '../utils/getTokenFromHeader.js'
import verifyToken from '../utils/verifyToken.js';

const isLoggedIn = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req);
    // verify token 
    const decodedUser = verifyToken(token);
    // save user into req obj
    if (!decodedUser) {
        throw new Error('Invalid/Expired token, please login again😁😁😁')
    } else {
        // console.log(req.userAuthId);
        req.userAuthId = decodedUser?.id;      
        next();
    }
}

export default isLoggedIn
