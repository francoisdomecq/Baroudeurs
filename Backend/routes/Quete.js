//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const QueteCtrl = require('../controllers/Quete')

router.get('/', QueteCtrl.getAllQuete)
router.post('/', QueteCtrl.createQuete)
router.get('/:id', QueteCtrl.getOneQuete)
router.put('/:id', QueteCtrl.modifyQuete)
router.delete('/:id', QueteCtrl.deleteQuete)

module.exports = router
