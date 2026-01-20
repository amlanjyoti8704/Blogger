// import multer from "multer";

// const storage=multer.diskStorage({})

// const upload=multer({storage})

// export default upload

import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";

// create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

export default upload;