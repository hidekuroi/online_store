const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleCheckMiddleware')

router.get('/', authMiddleware, basketController.getBasketDevices)
router.post('/', authMiddleware, basketController.add)
router.delete('/', authMiddleware, basketController.deleteBasketDevice)
router.put('/', authMiddleware, basketController.updateAmount)


module.exports = router