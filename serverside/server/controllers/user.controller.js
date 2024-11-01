// In your user.controller.js
const User = require("../models/User"); // Import your user model (make sure to define this model)
const Book = require("../models/Booking");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this name" }); // User already exists
    }
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User aleady exists with this email" });
    }
    // console.log(password);

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10); // You can change the salt rounds (10) as needed
    // console.log(hashedPassword);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password, // Save the hashed password it was "password : hashedPassword" first
    });
    // console.log(newUser);

    await newUser.save(); // Save the user to the database
    const user = await User.findOne({ username });
    // console.log('Stored password (hashed):', user.password);

    res.status(201).json({ message: "User registered successfully" }); // Success message
  } catch (error) {
    console.error("Registration error:", error); // Log error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // console.log(username,password);
  // console.log("username", username);
  // console.log("password", password);

  try {
    const user = await User.findOne({ username }); // Find user by username
    // console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials username" }); // User not found
    }

    // console.log(password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("from form", password);

    console.log("from database", user.password);

    console.log(isMatch);
    console.log("userlogin");

    // Compare passwords
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials password" }); // Passwords don't match
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Use the JWT_EXPIRES_IN from the environment variables
    });
    console.log("generated Token : ", token);

    res.status(200).json({ token, message: "Login successful" }); // Send token and success message
  } catch (error) {
    console.error("Login error catch:", error);
    res.status(500).json({ message: "Server error catch" });
  }
};

// Controller to search for users based on a query
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.searchUsers = async (req, res) => {
  // const { search } = req.query; // Extract the 'search' query parameter from the request

  try {
    const { search } = req.query;
    console.log(search);

    // Find users whose username or email matches the search query, case-insensitive
    // Apply regex search if a search term is provided
    let query = {};
    if (search) {
      const escapedSearch = escapeRegex(search);
      query = { username: { $regex: escapedSearch, $options: "i" } };
    }

    const users = await User.find(query);

    res.status(200).json(users); // Respond with the matching users
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.logout = async(req,res)=>{
//   res.cookie("token", null, {
//         expires: new Date(Date.now()),
//         httpOnly: true,
//     });

//     res.status(200).json({
//         success: true,
//         message: "Logged Out",
//     });
//     console.log("Loogged out");

// };
