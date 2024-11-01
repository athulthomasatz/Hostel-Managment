// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // // Middleware to verify authentication using JWT
// // exports.verifyAuth = async (req, res, next) => {
// //     const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header
// //     if (!token) {
// //         return res.status(401).json({ error: 'No token, authorization denied' });
// //     }
// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
// //         req.user = await User.findById(decoded.id).select('-password'); // Fetch user without password
// //         next(); // Proceed to next middleware or route handler
// //     } catch (error) {
// //         res.status(401).json({ error: 'Invalid token' }); // Handle invalid token
// //     }
// // };
// // // Middleware to verify if the user is an admin
// // exports.adminAuthMiddleware = (req, res, next) => {
// //     // Check for Authorization header
// //     const authHeader = req.headers.authorization;
// //     console.log(authHeader);

// //     if (!authHeader) {
// //         return res.status(401).json({ message: 'Authorization header missing' });
// //     }

// //     // Extract token from Authorization header
// //     const token = authHeader.split(' ')[1];
// //     if (!token) {
// //         return res.status(401).json({ message: 'No token provided' });
// //     }
// //     console.log("token in auth m",token);
// //     try {
// //         // Verify the token
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //         // Check if the user is an admin
// //         if (decoded && decoded.isAdmin) {
// //             req.admin = decoded; // Assuming `decoded` contains admin data
// //             next(); // Proceed to the next middleware or controller
// //         } else {
// //             return res.status(403).json({ message: 'Access denied. Not an admin.' });
// //         }
// //     } catch (error) {
// //         // Handle any token verification errors
// //         return res.status(403).json({ message: 'Invalid token' });
// //     }
// // };

// // In verifyAuth
// exports.verifyAuth = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   console.log("verifyauth token", token);

//   if (!token) {
//     return res.status(401).json({ error: "No token, authorization denied" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     console.log("User:", req.user); // Log the user object
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // In adminAuthMiddleware
// exports.adminAuthMiddleware = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({ message: 'Authorization header missing' });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Token:", decoded); // Log decoded token for debugging

//         // Fetch user from the database to check if they are an admin
//         const user = await User.findById(decoded.id);
//         if (user && user.isAdmin) {
//             req.admin = user; // Set req.admin to the user object
//             next(); // Proceed to the next middleware/controller
//         } else {
//             return res.status(403).json({ message: 'Access denied. Not an admin.' });
//         }
//     } catch (error) {
//         console.error('Error verifying token:', error);
//         return res.status(403).json({ message: 'Invalid token' });
//     }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const verifyAuth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) { 
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have a valid JWT secret
        req.user = await User.findById(decoded.id); // Make sure you're using the correct property name (e.g., decoded.id)
        if (!req.user) { // Check if user was found
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = verifyAuth;
