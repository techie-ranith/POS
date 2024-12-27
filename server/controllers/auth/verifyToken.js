const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
 
  
    if (!token) {
      return res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return res.status(200).json({ success: true, message: 'Token verified successfully.' });
    } catch (error) {
      console.error("Token verification failed:", error.message);  
      return res.status(401).json({ success: false, message: 'Invalid or expired token', error: error.message });
    }
  };
  
module.exports = { verifyToken };
