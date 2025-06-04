import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  }
})

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
}

// multer middleware
export const upload = multer({
  storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

// const uploadMiddleware = (req, res, next) => {
//   upload.single("image")(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message
//       });
//     }
//     next();
//   });
// }

// export default uploadMiddleware
