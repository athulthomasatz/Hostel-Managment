const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Room = require("../models/Room");
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invlaid username " });
    }
    const isAdmin = user.isAdmin;
    console.log("admin",isAdmin);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("from form", password);

    console.log("from database", user.password);

    console.log("paswword",isMatch);

    // Compare passwords
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials password" }); // Passwords don't match
    }
    if(!isAdmin){
        return res.status(402).json({message:"access denied you are not adminn"});
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    res.status(200).json({ token, message: "Login successful" }); // Send token and success message
  } catch (error) {
    console.error("Login error catch:", error);
    res.status(500).json({ message: "Server error catch" });
  }
};

// Middleware to verify authentication using JWT
const verifyAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from header
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Fetch user without password
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" }); // Handle invalid token
  }
};

// Middleware to verify if the user is an admin
const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user && user.isAdmin) {
      req.admin = user; // Set req.admin to the user object
      next(); // Proceed to the next middleware/controller
    } else {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Example: Admin Dashboard Controller
exports.getAdminDashboard = async (req, res) => {
  try {
    const admin = req.admin; // assuming req.admin is set after verifying the token
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ name: admin.username }); // Return only the name
  } catch (error) {
    console.error("Error fetching admin data:", error); // Log the error
    res.status(500).json({ message: "Error fetching admin data" });
  }
};

// Exporting middleware for use in routes
exports.verifyAuth = verifyAuth;
exports.adminAuthMiddleware = adminAuthMiddleware;

// Example: adminController.js

// exports.getAdminDashboard = async (req, res) => {
//   try {
//     const admin = req.admin; // assuming req.admin is set after verifying the token
//     console.log("admin", admin);
//     // In getAdminDashboard
//     console.log("Admin in dashboard:", req.admin);
//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }
//     res.status(200).json({ name: admin.username }); // Return only the name
//   } catch (error) {
//     console.error("Error fetching admin data:", error); // Log the error
//     res.status(500).json({ message: "Error fetching admin data" });
//   }
// };
