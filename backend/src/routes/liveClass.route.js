const express = require("express");

const liveClassRouter = express.Router();

const liveClassController =
    require("../controllers/liveClass.controller");

const {isAlreadyReg} =
    require("../middlewares/isAlreadyReg.middleware");

const isAdmin = require('../middlewares/isAdmin');


// ==========================================
// STUDENT / USER
// ==========================================

liveClassRouter.get(
    "/live-classes",
    isAlreadyReg,
    liveClassController.getLiveClasses
);


liveClassRouter.get(
    "/live-classes/:liveClassId",
    isAlreadyReg,
    liveClassController.getLiveClassById
);


// ==========================================
// ADMIN
// ==========================================

liveClassRouter.post(
    "/admin/live-classes",
    isAlreadyReg,
    isAdmin,
    liveClassController.createLiveClass
);


liveClassRouter.get(
    "/admin/live-classes",
    isAlreadyReg,
    isAdmin,
    liveClassController.getAllLiveClassesAdmin
);

// recorder class api

liveClassRouter.patch(
  "/admin/:liveClassId/recording",
  isAlreadyReg,
  isAdmin,
  liveClassController.updateLiveClassRecording
);


module.exports = liveClassRouter;