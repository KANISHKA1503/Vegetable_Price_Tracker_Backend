const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    vegetable: {
      type: String,
      required: true
    },
    minPrice: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketPrice", marketPriceSchema);
