const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../configs/multer");
const asyncHandler = require("../helpers/async-handler");

router.post(
  "/image",
  uploadDisk.single("file"),
  asyncHandler(UploadController.uploadThumb)
);

module.exports = router;
