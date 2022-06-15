//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const JournalCtrl = require('../controllers/Journal')

router.get('/', JournalCtrl.getAllJournal)
router.post('/', JournalCtrl.createJournal)
router.get('/:id', JournalCtrl.getOneJournal)
router.put('/:id', JournalCtrl.modifyJournal)
router.delete('/:id', JournalCtrl.deleteJournal)

module.exports = router
