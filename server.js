require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const createDB = require("./config/db");
createDB();

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);
const shipmentRoutes = require("./routes/shipmentRoutes");
app.use("/shipments", shipmentRoutes);
const marketPriceRoutes = require("./routes/marketPriceRoutes");
app.use("/prices", marketPriceRoutes);


app.listen(process.env.PORT,()=>
{
    console.log(`server running at port http://localhost:${process.env.PORT}`)
})