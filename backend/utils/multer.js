import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp");   // ✅ save file here first
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // avoid name conflicts
  }
});

export const upload = multer({ storage });
