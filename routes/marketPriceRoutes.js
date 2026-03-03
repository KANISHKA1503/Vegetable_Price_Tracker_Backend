const express = require("express");
const router = express.Router();

const {
  setMarketPrice,
  getTodayPrices
} = require("../controllers/marketPriceController");

const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", auth, isAdmin, setMarketPrice);
router.get("/", getTodayPrices);

module.exports = router;
