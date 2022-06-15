//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const SuccesCtrl = require('../controllers/Succes')

router.get('/', SuccesCtrl.getAllSucces)
router.post('/', SuccesCtrl.createSucces)
router.get('/:id', SuccesCtrl.getOneSucces)
router.put('/:id', SuccesCtrl.modifySucces)
router.delete('/:id', SuccesCtrl.deleteSucces)

module.exports = router
