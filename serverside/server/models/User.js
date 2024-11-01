const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePhoto: {
    type: String, // Store the URL of the profile photo
    default:"public/images/AvatarProfile.png" // Path relative to your public folder
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password modified
  const salt = await bcrypt.genSalt(10); // Generate a salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save
});

// Method to compare entered password and hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare passwords
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
