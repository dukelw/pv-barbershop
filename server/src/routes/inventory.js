const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const inventoryController = require("../controllers/InventoryController");

router.use(authentication);
router.post("/add", asyncHandler(inventoryController.addItem));
router.get("/all", asyncHandler(inventoryController.getAll));
router.put("/:id", asyncHandler(inventoryController.updateItem));
router.delete("/:id", asyncHandler(inventoryController.deleteItem));

module.exports = router;
