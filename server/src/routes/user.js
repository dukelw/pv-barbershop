const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const userController = require("../controllers/UserController");

router.post("/other-signin", asyncHandler(userController.signinAnotherWay));
router.post("/other-signup", asyncHandler(userController.signupAnotherWay));
router.post("/signin", asyncHandler(userController.signin));
router.post("/signup", asyncHandler(userController.signup));
router.post("/create-account", asyncHandler(userController.createAccount));
router.get("/find/:id", asyncHandler(userController.find));
router.get("/find-barber", asyncHandler(userController.findAllFreeBarber));
router.get("/find-receptionist", asyncHandler(userController.findReceptionist));
router.get("/barber", asyncHandler(userController.findAllBarber));
router.get("/", asyncHandler(userController.findAll));
router.delete("/:id/:userID", asyncHandler(userController.delete));
router.put("/point", asyncHandler(userController.updatePoint));
router.post("/restore-password", asyncHandler(userController.restorePassword));

router.use(authentication);
router.post("/logout", asyncHandler(userController.logout));
router.post("/add-favourite", asyncHandler(userController.addToFavouriteList));
router.post("/change-password", asyncHandler(userController.changePassword));
router.post(
  "/update-address-default",
  asyncHandler(userController.updateAddressDefault)
);
router.post("/update-address", asyncHandler(userController.updateAddress));
router.post("/add-address", asyncHandler(userController.addAddress));
router.post("/update", asyncHandler(userController.updateInformation));
router.post("/refresh-token", asyncHandler(userController.refreshToken));

module.exports = router;
