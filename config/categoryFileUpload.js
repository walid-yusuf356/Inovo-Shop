// import cloudinary package
import cloudinaryPackage from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinary = cloudinaryPackage.v2;

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// create a cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpeg", "png", "jpg"],
  params: {
    folder: "Ecommerce-api",
  },
});

// create a multer instance and pass the cloudinary storage
const upload = multer({ storage });

export default upload;