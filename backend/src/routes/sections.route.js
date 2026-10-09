const {Router} = require('express')
const sectionController = require('../controllers/section.controller')
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware')

const sectionRouter = Router()

// account settings route api

sectionRouter.post("/admin/create-c-language-sections",isAlreadyReg,sectionController.createCLanguageSections)


module.exports = sectionRouter