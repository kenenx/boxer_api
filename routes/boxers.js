const express = require('express')

const boxersController = require('../controllers/boxers')
const router = express.Router()

router.get('/', boxersController.index)
router.get('/:id', boxersController.show)
router.post('/', boxersController.create)
router.patch('/:id', boxersController.update)
router.delete('/:id', boxersController.destroy)


module.exports = router