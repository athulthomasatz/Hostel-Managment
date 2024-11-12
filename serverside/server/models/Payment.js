const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cardDetails: {
        lastFour: String,
        expiryDate: String,
        nameOnCard: String
    },
    otp: {
        code: String,
        expiresAt: Date
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        unique: true
    },
    completedAt: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
