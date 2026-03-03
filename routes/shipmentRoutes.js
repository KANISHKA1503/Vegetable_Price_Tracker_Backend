const express = require("express");
const router = express.Router();

const { sendShipment,  getAllShipments } = require("../controllers/shipmentController");
const { auth, isFarmer,isAdmin } = require("../middleware/authMiddleware");

router.post("/notify", auth, isFarmer, sendShipment);
router.get("/", auth, isAdmin, getAllShipments);

module.exports = router;
