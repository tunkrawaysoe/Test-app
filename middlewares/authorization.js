import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get "Bearer <token>"

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extract the actual token

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your secret key
      req.user = decoded; // Attach user info to the request
      return next(); // Proceed to the protected route
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }

  res.status(401).json({ message: 'No token provided or bad format' });
};
