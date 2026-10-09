const {Router} = require('express');

const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');

const acceptContactDetails = require('../validator/contact.validator')

const contactController = require('../controllers/contact.controller')

const contactRouter = Router();


//accept user problem api here
contactRouter.post("/contact",isAlreadyReg,acceptContactDetails,contactController.addContactDetails);

//fetch all users problem api here
contactRouter.get("/fetch-contacts",isAlreadyReg,contactController.getAllContactDetails);



module.exports = contactRouter;