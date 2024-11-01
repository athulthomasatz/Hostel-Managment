const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNo: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  allocatedTo: [
    {
      name: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  // Track who is currently allocated to the room
  currentOccupants: { type: Number, default: 0 },
  status: { type: String, default: "Available" }, // Available, Occupied, Under Maintenance
  roomType: { type: String }, // Single, Double, Shared, etc.
  feesPerSemester: { type: Number },
  amenities: { type: [String] }, // e.g., ['Wi-Fi', 'AC', 'Attached Bathroom']
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
