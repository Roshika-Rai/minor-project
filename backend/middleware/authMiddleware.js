const jwt = require('jsonwebtoken');

// ✅ Middleware to verify user authentication
const verifyToken = (req, res, next) => {
  try {
    // Token extract from request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied! No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;

    // Move to next middleware or controller
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
    });
  }
};

module.exports = verifyToken;