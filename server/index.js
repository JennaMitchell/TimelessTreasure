const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./vars.env" });

const authRoute = require("./routes/auth");
const updateUserSettingsRoute = require("./routes/update-user-settings");
// const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");

const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

app.use(cors());
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Not Connected" }],
    });
  });
app.use(
  session({
    secret: process.env.SESSION_PASS,
    resave: false,
    saveUninitialized: false,
    store: store,
    expires: 1000 * 60 * 60 * 24 * 30,
  })
);

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use("/auth", authRoute);

app.use("/update", updateUserSettingsRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
