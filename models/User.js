const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    mobile: {
  type: String,
  required: true,
  match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"]
},
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["farmer", "admin"],
      default: "farmer"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
