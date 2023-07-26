const controller = require('../controllers/peopleController')
const express = require('express')

const router = express.Router()


router.post('/addUser', controller.addNewUser) 
router.get('/allUsers', controller.findAllUsers)
router.get('/user/:id', controller.findUserById)
router.post('/user/login', controller.login)
router.delete('/:id', controller.deleteUserById)


module.exports = router