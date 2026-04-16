const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Check for token in cookies first, then body, then query, then headers
    const token = req.cookies.token || req.body.token || req.query.token || req.headers["authorization"]?.replace('Bearer ', '');
    console.log('---token from cookies---', req.cookies.token);
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRITKEY || process.env.JWT_SECRET);
        console.log('verification decoded', decoded);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
}

module.exports = { verifyToken }