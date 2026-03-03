const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vegetable: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ["bags", "boxes"],
      default: "bags"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
