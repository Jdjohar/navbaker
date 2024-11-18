const express = require("express");
const { addCake, getUserCakes } = require("../controllers/cakeController");
const { protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Cake = require("../models/Cake");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "cakes" },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", protect, upload.single("image"), addCake); // Add cake (requires auth)
router.get("/",  protect,  getUserCakes); // Get all cakes by the logged-in user

router.get("/storeowner/:userId", async (req, res) => {
  console.log("storeowner");

  try {
    const { userId } = req.params; // Extract userId from req.params

    console.log("Received userId:", userId);
    let query = {};

    // if (userId) {
    //   try {
    //     // Check the format and log
    //     console.log("Checking userId format...");

    //     // // Use ObjectId only if userId is 24 hex characters
    //     // query.user = userId.length === 24 ? new mongoose.Types.ObjectId(userId) : userId;

    //     console.log("Query with userId:", query.user);
    //   } catch (error) {
    //     console.error("Invalid userId format or conversion error:", error);
    //     return res.status(400).json({ message: 'Invalid userId format' });
    //   }
    // }

    const cakes = await Cake.find(query); // Fetch cakes filtered by user
    console.log("Cakes found:", cakes);
    res.json(cakes);
  } catch (error) {
    console.error("Server Error:", error); // Log the actual error
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit Cake Route
router.put('/editcakes/:id', async (req, res) => {
  const { id } = req.params; // Get the cake ID from the URL parameter
  const { name, description, imageUrl, price } = req.body; // Get the updated data from the request body

  try {
    // Find the cake by ID
    const cake = await Cake.findById(id);

    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    // Update the cake with new data
    cake.name = name || cake.name; // Only update the field if it is provided
    cake.description = description || cake.description;
    cake.imageUrl = imageUrl || cake.imageUrl;
    cake.price = price || cake.price;

    // Save the updated cake to the database
    const updatedCake = await cake.save();

    res.json(updatedCake); // Return the updated cake
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
