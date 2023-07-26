const controller = require('../controllers/wordsController')
const express = require('express')

const router = express.Router()


router.get('/allWords', controller.findAllWords)
router.get('/:id', controller.findsWordById)
router.post('/create', controller.createWord)
router.get('/wrd/:word', controller.findByWord)
router.get('/date/:year', controller.findByYear)
router.get('/user/:username', controller.findByUsername)
router.patch('/update/:id', controller.updateWordById)
router.patch('/update/wrd/:word', controller.updateByWord)
router.delete('/delete/:id', controller.deleteWordById)
router.delete('/delete/wrd/:word', controller.deleteByWord)
router.delete('/delete/date/:year', controller.deleteByYear)
router.delete('/delete/user/:username', controller.deleteByUser)


module.exports = router