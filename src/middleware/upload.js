const multer = require("multer");

const msc = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

console.log("multer-storage-cloudinary:", msc);
console.log("type:", typeof msc);
console.log("keys:", Object.keys(msc));
const CloudinaryStorage = msc.CloudinaryStorage;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Mexi Medicals",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload; 