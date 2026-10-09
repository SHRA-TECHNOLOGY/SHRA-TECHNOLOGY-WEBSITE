const {Router} = require('express')
const settingsController = require('../controllers/settings.controller')
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware')

const settingsRouter = Router()

// account settings route api

settingsRouter.post("/account-settings",isAlreadyReg,settingsController.accountController)

// account settings route api

settingsRouter.post("/password-settings",isAlreadyReg,settingsController.passwordSettings)


module.exports = settingsRouter