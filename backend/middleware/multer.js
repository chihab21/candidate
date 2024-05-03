const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      const uniqueSuffix = buf.toString("hex");
      cb(null, uniqueSuffix + "-" + file.originalname);
    });
  },
});

const upload = multer({ storage: storage }).single("file");

module.exports = upload;
