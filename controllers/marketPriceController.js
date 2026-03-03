const MarketPrice = require("../models/MarketPrice");


const setMarketPrice = async (req, res) => {
  try {
    const { vegetable, minPrice, maxPrice, date } = req.body;

    const price = await MarketPrice.findOneAndUpdate(
      { vegetable, date },
      { minPrice, maxPrice },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Market price updated",
      price
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update price" });
  }
};

const getTodayPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({ vegetable: 1 });
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prices" });
  }
};
module.exports= {setMarketPrice,getTodayPrices}
