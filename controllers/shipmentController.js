const Shipment = require("../models/Shipment");

const sendShipment = async (req, res) => {
  try {
    const { vegetable, quantity, unit } = req.body;

    if (!vegetable || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const shipment = await Shipment.create({
      farmerId: req.userData.id,
      vegetable,
      quantity,
      unit
    });

    res.status(201).json({
      message: "Shop notified successfully",
      shipment
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to notify shop" });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("farmerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch shipments" });
  }
};
module.exports= {sendShipment,getAllShipments}
