const express = require("express");

const studentRouter = express.Router();

const studentController = require("../controllers/student.controller");

const {isAlreadyReg} = require("../middlewares/isAlreadyReg.middleware");
const isAdmin = require("../middlewares/isAdmin");

studentRouter.get(
  "/students/all",
  isAlreadyReg,
  isAdmin,
  studentController.getAllStudents,
);

module.exports = studentRouter;
