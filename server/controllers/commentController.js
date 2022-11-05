const ApiError = require('../error/ApiError')
const roleCheckMiddleware = require('../middleware/roleCheckMiddleware')
const {Comment, User} = require('../models/models')


class CommentController {

    async addComment(req, res) {
        const {deviceId, body} = req.body
        const comment = await Comment.create({deviceId, body, userId: req.user.id})
        const user = await User.findOne({where: {id: req.user.id}})
        
        return res.json({comment, userName: user.userName, img: user.img})
    }
    async getComments(req, res, next) {
        try{
        let {deviceId, limit, page, deletedAmount} = req.query
        deletedAmount = deletedAmount || 0
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit - deletedAmount

        const comments = await Comment.findAndCountAll({where: {deviceId}, limit, offset, order: [['id', 'DESC']]})

        let commentsWithNames = []

        for (let i = 0; i < comments.rows.length; i++) {
            const user = await User.findOne({where: {id: comments.rows[i].userId}})
            commentsWithNames.push({comment: comments.rows[i], userName: user.userName, img: user.img})
        }

        return res.json({comments: commentsWithNames, count: comments.count})

        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteComment(req, res, next) {
        const {deviceId, commentId} = req.body
        if(req.user.role === 'ADMIN'){
            try {
                const comment = Comment.destroy({where: {deviceId, id: commentId}})
                return res.json(comment)
            }
            catch(e) {
                next(ApiError.badRequest(e.message))
            }
        }  
        else {
            try{
                const comment = Comment.destroy({where: {deviceId, id: commentId, userId: req.user.id}})
                
                return res.json(comment)
            }
            catch(e) {
                next(ApiError.badRequest(e.message))
            }
        }
    }
    async getMyComments(req, res, next) {
        let {userId} = req.params
        userId = Number(userId)
        let comments

        if(userId === req.user.id){
            comments = await Comment.findAll({where: {userId}})
        }

        return res.json(comments)
    }

}

module.exports = new CommentController()