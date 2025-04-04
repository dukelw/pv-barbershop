const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const appointmentController = require("../controllers/AppointmentController");

router.use(authentication);
router.post("/create", asyncHandler(appointmentController.create));
router.get("/user", asyncHandler(appointmentController.getByUser));
router.get(
  "/barber/:barberId",
  asyncHandler(appointmentController.getByBarber)
);
router.put("/:id/status", asyncHandler(appointmentController.updateStatus));
router.delete("/:id", asyncHandler(appointmentController.delete));

module.exports = router;
