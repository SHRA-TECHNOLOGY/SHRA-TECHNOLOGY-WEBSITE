const {Router} = require('express');
const announcementController = require('../controllers/announcement.controller');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');

const announcementRouter = Router();

//Announcement Api create
announcementRouter.post("/create-announcement",announcementController.createAnnouncement);




module.exports = announcementRouter;