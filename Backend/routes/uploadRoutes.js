const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

// Upload Route
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Check file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload function
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error)
          }
        });

        //User Streamifier to convert the buffer to strem
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    // Upload image
    const result = await streamUpload(req.file.buffer);

    //Respond with the StreamUpload function
    res.json({imagUrl: result.secure_url});

  } catch (error) {
    console.error(error);

    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;