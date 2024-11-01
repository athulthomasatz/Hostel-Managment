const Booking = require("../models/Booking"); // Adjust path based on your structure
const Room = require("../models/Room");

exports.bookRoom = async (req, res) => {
  try {
    const { roomId, name, mobileNumber, parentMobileNumber } = req.body;
    const userId = req.user._id;
    
    // Validate data
    if (!roomId || !name || !mobileNumber || !parentMobileNumber || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }
    if (room.status !== "Available") {
      return res.status(400).json({ message: "Room is not available for booking." });
    }

    // Create booking with a pending status
    const booking = new Booking({
      roomId,
      userId,
      name,
      mobileNumber,
      parentMobileNumber,
      status: "pending", 
    });

    const savedBooking = await booking.save();

    res.status(201).json({ message: "Booking submitted successfully!", bookingId: savedBooking._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the booking." });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
      const bookings = await Booking.find().populate('roomId userId', 'roomNo username'); // Adjust fields as needed
      console.log("Bookingssss: ",bookings);
      
      res.json(bookings);
  } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings." });
  }
};

// exports.approveBooking = async (req, res) => {
//   try {
//       const { id } = req.params;

//       // Step 1: Find and update the booking status to 'confirmed'
//       const booking = await Booking.findByIdAndUpdate(
//           id,
//           { status: 'confirmed' }, 
//           { new: true }
//       ).populate('roomId').populate('userId'); // Populate room and user details

//       if (!booking) {
//           return res.status(404).json({ message: "Booking not found." });
//       }

//       // Step 2: Find the associated room
//       const room = await Room.findById(booking.roomId);

//       if (!room) {
//           return res.status(404).json({ message: "Room not found." });
//       }

//       // Step 3: Check if room capacity allows adding another user
//       if (room.currentOccupants < room.capacity) {
//           // Add user details to `allocatedTo` array
//           room.allocatedTo.push({
//               name: booking.name,
//               userId: booking.userId
//           });
//           room.currentOccupants += 1;

//           // Update room status if fully occupied
//           if (room.currentOccupants === room.capacity) {
//               room.status = "Occupied";
//           }

//           await room.save();

//           res.json({
//               message: "Booking approved and room allocated successfully",
//               booking,
//               room
//           });
//       } else {
//           // Room is at full capacity
//           res.status(400).json({ message: "Room capacity full. Cannot allocate more users." });
//       }
//   } catch (error) {
//       console.error("Error approving booking:", error);
//       res.status(500).json({ message: "Error approving booking." });
//   }
// };

exports.approveBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update booking status to 'confirmed'
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: 'confirmed' },
      { new: true }
    ).populate('roomId').populate('userId'); 

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Update the room's allocatedTo field with the user details
    const room = await Room.findById(updatedBooking.roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Push new occupant into allocatedTo array if capacity allows
    if (room.allocatedTo.length < room.capacity) {
      room.allocatedTo.push({
        name: updatedBooking.name,
        userId: updatedBooking.userId,
      });
      room.currentOccupants += 1; // Increment occupant count
      room.status = room.currentOccupants === room.capacity ? "Occupied" : "Available";
    }
    await room.save();

    res.json({ booking: updatedBooking, room });
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).json({ message: "Error approving booking." });
  }
};

         
