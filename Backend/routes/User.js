//Regarder CrossFeaturing.js pour comprendre le fonctionnement des routes

const express = require('express')
const router = express.Router()

const UserCtrl = require('../controllers/User')

router.get('/', UserCtrl.getAllUser)
router.post('/', UserCtrl.createUser)
router.get('/:id', UserCtrl.getOneUser)
router.put('/:id', UserCtrl.modifyUser)
router.delete('/:id', UserCtrl.deleteUser)

module.exports = router
