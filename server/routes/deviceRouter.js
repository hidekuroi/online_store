const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleCheckMiddleware')

router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', checkRole('ADMIN'), deviceController.create)
router.delete('/', checkRole('ADMIN'), deviceController.delete)
router.put('/', checkRole('ADMIN'), deviceController.updateDevice)


module.exports = router