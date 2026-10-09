const {Router} = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');


const dashboardRouter = Router();



// Fetch dashboard api

dashboardRouter.post("/get-dashboard",isAlreadyReg,dashboardController.getDashboard);


module.exports = dashboardRouter;