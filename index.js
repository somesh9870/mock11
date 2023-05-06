const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const orderRouter = require("./routes/order.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/book", bookRouter);

app.use("/order", orderRouter);

// connecting with mongoDB server and running local server with nodemon to keep track of every changes
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("error in connecting to mongoDB");
  }
  console.log(`server is running on port ${process.env.PORT}`);
});
