const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const appointmentController = require("../controllers/AppointmentController");
router.post("/create", asyncHandler(appointmentController.create));
router.get("/get-all", asyncHandler(appointmentController.getAll));
router.get("/:id", asyncHandler(appointmentController.get));
router.put("/:id/status", asyncHandler(appointmentController.updateStatus));

router.get("/user", asyncHandler(appointmentController.getByUser));
router.get(
  "/barber/:barberId",
  asyncHandler(appointmentController.getByBarber)
);
router.put("/:id", asyncHandler(appointmentController.update));
router.delete("/:id", asyncHandler(appointmentController.delete));

module.exports = router;
