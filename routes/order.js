const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../model/order");

// POST - Place Order
router.post("/orders", async (req, res) => {
  try {
    const { customer, items, subtotal, discount, deliveryFee, total, paymentMethod } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = await createOrder({
      customer,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
    });

    console.log("New Order:", newOrder);

    res.json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order place nahi hua" });
  }
});

// GET - All Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Orders get nahi ho rahe" });
  }
});

// GET - Single Order by ID
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order get nahi hua" });
  }
});

module.exports = router;