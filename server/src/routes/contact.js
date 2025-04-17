const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const contactController = require("../controllers/ContactController");

router.post("/redemption", asyncHandler(contactController.sendRedemption));
router.post("/", asyncHandler(contactController.send));

module.exports = router;
