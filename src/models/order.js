const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: String,

    phone: String,

    email: String,

    address: String,

    city: String,

    state: String,

    items: Array,

    subtotal: Number,

    deliveryFee: Number,

    total: Number,

    reference: String,

    paymentMethod: {

        type: String,

        default: "Bank Transfer"

    },

    paymentStatus: {

        type: String,

        enum: [
            "Pending",
            "Awaiting Verification",
            "Paid",
            "Rejected"
        ],

        default: "Pending"

    },

    orderStatus: {

        type: String,

        enum: [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],

        default: "Pending"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Order", orderSchema);