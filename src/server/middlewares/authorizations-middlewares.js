import User from '../api/models/User.js';
import { verifyToken } from '../utils/json-web-token.js';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer', '').trim();
    const auth = verifyToken(token);

    const user = await User.findOne({ username: auth.username });
    req.user = user;

    // Token Version
    if (user.tokenVersion !== auth.tokenVersion) {
      return res.status(401).json({
        message: 'Session expired. Login again',
        status: 401,
      });
    }

    if (!req.user) {
      return res.status(400).json({
        message: 'Login to access',
        status: 400,
      });
    }
    //
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Login to access',
      status: 400,
    });
  }
};

const isAdmin = async (req, res, next) => {
  // Admin or Self
  if (req.user.role !== 'admin') {
    return res.status(400).json({
      message: 'Permission Denied',
      status: 400,
    });
  }
  //
  next();
};

export { isLoggedIn, isAdmin };
