import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied, no token provided"
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please login again"
      });
    }
    // Handle other JWT errors (e.g., invalid token)
    return res.status(401).json({
      success: false,
      message: "Invalid token, please login again"
    });
  }
};

export default authMiddleware;