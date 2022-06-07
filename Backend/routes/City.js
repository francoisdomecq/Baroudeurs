//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const CityCtrl = require('../controllers/City')

router.get('/', CityCtrl.getAllCity)
router.post('/', CityCtrl.createCity)
router.get('/:id', CityCtrl.getOneCity)
router.put('/:id', CityCtrl.modifyCity)
router.delete('/:id', CityCtrl.deleteCity)

module.exports = router
