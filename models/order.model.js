const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
    books: [{ type: ObjectId, ref: "Book" }],
    totalAmount: Number,
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
