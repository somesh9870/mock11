const express = require("express");
const isAuth = require("../middlewares/auth.middleware");
const OrderModel = require("../models/order.model");

const orderRouter = express.Router();

//  This endpoint will allow the customer to place an order for a list of books. (Protected Route)
orderRouter.post("/orders", isAuth, async (req, res) => {
  const payload = req.body;
  try {
    const book = new OrderModel(payload);
    await book.save();
    res.status(201).send({ msg: "order has been placed" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// This endpoint will allow admin to view all the orders placed so far with the user and book details.
orderRouter.get("/orders", isAuth, async (req, res) => {
  try {
    const book = await OrderModel.find()
      .populate("user")
      .populate("books")
      .exec();

    res.status(200).send({ msg: "All the orders", data: book });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = orderRouter;
