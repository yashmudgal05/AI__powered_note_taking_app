// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(403).json({ error: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.id; // Store user ID in request object
//         next();
//     } catch (err) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };

// module.exports = authenticateToken;


const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.userId = user.id; // ✅ Store userId for later use
        next();
    });
};

module.exports = authenticateToken;
