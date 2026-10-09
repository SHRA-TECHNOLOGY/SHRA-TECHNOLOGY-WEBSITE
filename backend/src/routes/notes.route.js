const express = require("express");


const notesRouter = express.Router();

const notesController = require("../controllers/notes.controller");
const {isAlreadyReg} = require("../middlewares/isAlreadyReg.middleware");
const isAdmin = require("../middlewares/isAdmin");

// multer middleware
const upload = require("../middlewares/file.middleware");

notesRouter.get("/notes/courses", isAlreadyReg, notesController.getCoursesForNotes);

notesRouter.get(
  "/notes/sections/:courseId",
  isAlreadyReg,
  notesController.getSectionsForNotes,
);

// create notes

notesRouter.post(
    "/notes/create",
    isAlreadyReg,
    isAdmin,
    notesController.createNote
);

notesRouter.get(
    "/notes/all",
    isAlreadyReg,
    notesController.getAllNotes
);

module.exports = notesRouter;
