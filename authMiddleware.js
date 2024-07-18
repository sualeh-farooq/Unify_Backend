const { verifyToken } = require('./lib/jwt')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Token Provided' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
