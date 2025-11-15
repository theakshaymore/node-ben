import multer from "multer";
import path from "path";
import fs from "fs";

// for local upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.resolve(`./public/uploads/${req.user._id}`);

//     // Create directory if doesn't exist
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   },
// });

// for imagekit
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export { upload };
