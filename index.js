const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/deliverySystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Delivery Schema
const deliverySchema = new mongoose.Schema({
  orderId: String,
  deliveryDate: Date,
  deliveryAddress: String,
  deliveryFee: Number,
});

const Delivery = mongoose.model("Delivery", deliverySchema);

// Routes
app.post("/deliveries", async (req, res) => {
  const { orderId, deliveryDate, deliveryAddress, deliveryFee } = req.body;
  const delivery = new Delivery({
    orderId,
    deliveryDate,
    deliveryAddress,
    deliveryFee,
  });
  try {
    await delivery.save();
    res.status(201).send(delivery);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/deliveries", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).send(deliveries);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/deliveries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) return res.status(404).send();
    res.status(200).send(delivery);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/deliveries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) return res.status(404).send();
    res.status(200).send(delivery);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
