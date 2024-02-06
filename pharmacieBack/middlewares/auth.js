const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function (allowedRoles) {
    return async function (req, res, next) {
      const token = req.header('auth-token');
      if (!token) return res.status(401).json({ error: 'Access denied' });
  
      try {
        const decoded = jwt.verify(token, 'my secret key');
        const userId = decoded.userId;
  
        const user = await User.findById(userId).populate('role');
        if (!user) {
          return res.status(403).json({ error: 'User not found' });
        }
        const userRole = user.role.type;
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: 'Unauthorized role' });
        }
  
        req.user = decoded;
        next();
      } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
      }
    };
  };
