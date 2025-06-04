const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access denied, admin privileges required"
    });
  }
  next();
}

export default adminMiddleware;