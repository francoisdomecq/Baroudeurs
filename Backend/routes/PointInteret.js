//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const PointInteretCtrl = require('../controllers/PointInteret')

router.get('/', PointInteretCtrl.getAllPointInteret)
router.post('/', PointInteretCtrl.createPointInteret)
router.get('/:id', PointInteretCtrl.getOnePointInteret)
router.put('/:id', PointInteretCtrl.modifyPointInteret)
router.delete('/:id', PointInteretCtrl.deletePointInteret)

module.exports = router
