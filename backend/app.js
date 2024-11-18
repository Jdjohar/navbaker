const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cloudinary = require("cloudinary").v2;
const authRoutes = require("./routes/authRoutes");
const cakeRoutes = require("./routes/cakeRoutes");

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const corsWhitelist = [
    "http://localhost:5173",
    "https://navbaker.vercel.app",
  ];
  
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
  }
  // res.setHeader("Access-Control-Allow-Origin", "* , https://restro-wbno.vercel.app");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
  next();
  });
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cakes", cakeRoutes);

module.exports = app;
