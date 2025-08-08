// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(requiredRole) {
  return function(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // contains id, role, etc.

      // If a role is required, check it
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};
