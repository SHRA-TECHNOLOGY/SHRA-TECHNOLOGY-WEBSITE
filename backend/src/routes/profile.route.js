const { Router } = require("express");
const { isAlreadyReg } = require("../middlewares/isAlreadyReg.middleware");
const profileController = require("../controllers/profile.controller");
const  upload  = require("../middlewares/file.middleware");

const profileRouter = Router();

// add practice set

// profileRouter.post("/get-data",isAlreadyReg,practiceController.addPracticeSet);

// profile dashboard route api

profileRouter.get(
  "/profile-data",
  isAlreadyReg,
  profileController.getProfileDashboard,
);

// profile image update route api

profileRouter.post(
    "/account/profile-image",
    isAlreadyReg,
    upload.single("profileImage"),
    profileController.updateProfileImage
);

module.exports = profileRouter;
