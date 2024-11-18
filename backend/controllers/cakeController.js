const Cake = require("../models/Cake");
const cloudinary = require("cloudinary").v2;

// Add a new cake
const addCake = async (req, res) => {
  const { name, description, price } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path);

  try {
    const cake = new Cake({
      name,
      description,
      price,
      imageUrl: result.secure_url,
      user: req.user.id, // Associate with logged-in user
    });
    await cake.save();
    res.status(201).json(cake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cakes by the logged-in user
// const getUserCakes = async (req, res) => {
//   try {
//     const { userId } = req.params; // Extract userId from req.params
    
//     console.log("Received userId:", userId);
//     let query = {};
    
//     if (userId) {
//       try {
//         // Check the format and log
//         console.log("Checking userId format...");
        
//         // Use ObjectId only if userId is 24 hex characters
//         query.user = userId.length === 24 ? new mongoose.Types.ObjectId(userId) : userId;

//         console.log("Query with userId:", query.user);
//       } catch (error) {
//         console.error("Invalid userId format or conversion error:", error);
//         return res.status(400).json({ message: 'Invalid userId format' });
//       }
//     }

//     const cakes = await Cake.find(query); // Fetch cakes filtered by user
//     console.log("Cakes found:", cakes);
//     res.json(cakes);
//   } catch (error) {
//     console.error("Server Error:", error); // Log the actual error
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
// Get cakes by the logged-in user
const getUserCakes = async (req, res) => {
  try {
    const cakes = await Cake.find({ user: req.user.id });
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addCake, getUserCakes };
