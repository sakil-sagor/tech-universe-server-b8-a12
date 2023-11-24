const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// middlewares

app.use(
  cors({
    origin: ["http://localhost:5173", "https://assignment12-sakil.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const productsRoute = require("./routes/v1/products.route");
// const accesstoken = require("./routes/v1/token.route");

app.use("/api/v1/product", productsRoute);
// app.use("/api/v1/accesstoken", accesstoken)

module.exports = app;
