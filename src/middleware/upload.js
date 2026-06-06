const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

console.log(
  "multer-storage-cloudinary:",
  cloudinaryStoragePackage
);

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "Mexi Medicals",

    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;