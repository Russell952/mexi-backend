const multer = require("multer");

const CloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = CloudinaryStorage ({
  cloudinary,
  params: {
    folder: "Mexi Medicals",
    allowedformats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload; 