const Router = require('express')
const router = new Router()
const CommentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', CommentController.getComments)
router.get('/:userId', authMiddleware, CommentController.getMyComments)
router.post('/', authMiddleware, CommentController.addComment)
router.delete('', authMiddleware, CommentController.deleteComment)


module.exports = router