const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/roleCheckMiddleware')

router.get('/', typeController.getAll)
router.post('/', checkRole('ADMIN'),  typeController.create)
router.delete('/', checkRole('ADMIN'), typeController.delete)


module.exports = router