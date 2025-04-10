const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const invoiceController = require("../controllers/InvoiceController");

router.post("/create", asyncHandler(invoiceController.create));
router.get("/user", asyncHandler(invoiceController.getByUser));
router.get("", asyncHandler(invoiceController.getAll));
router.put("/:id/status", asyncHandler(invoiceController.updateStatus));

module.exports = router;
