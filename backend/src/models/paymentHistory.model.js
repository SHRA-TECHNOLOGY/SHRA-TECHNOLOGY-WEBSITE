const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "INR"
    },

    orderId: {
        type: String,
        required: true
    },

    paymentId: {
        type: String,
        required: true
    },

    signature: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["success", "failed"],
        default: "success"
    }

}, {
    timestamps: true
});


module.exports = mongoose.model(
    "PaymentHistory",
    paymentHistorySchema
);