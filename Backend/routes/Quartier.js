//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const QuartierCtrl = require('../controllers/Quartier')

router.get('/', QuartierCtrl.getAllQuartier)
router.post('/', QuartierCtrl.createQuartier)
router.get('/:id', QuartierCtrl.getOneQuartier)
router.put('/:id', QuartierCtrl.modifyQuartier)
router.delete('/:id', QuartierCtrl.deleteQuartier)

module.exports = router
