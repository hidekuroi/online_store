const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')


router.put('/', authMiddleware, ratingController.addRating)
router.get('/', authMiddleware, ratingController.getGivenRating)



module.exports = router