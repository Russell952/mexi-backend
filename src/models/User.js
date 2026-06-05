const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }

}, { timestamps: true });


// Hash password
userSchema.pre("save", async function() {

  if (!this.isModified("password")) return;

  this.password = await require("bcryptjs").hash(this.password, 10);

});


module.exports = mongoose.model("User", userSchema); // 🔥 THIS LINE IS KEY