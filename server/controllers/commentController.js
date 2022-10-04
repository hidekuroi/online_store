const ApiError = require('../error/ApiError')
const {Comment, User} = require('../models/models')


class CommentController {

    async addComent(req, res) {
        const {deviceId, body} = req.body
        const comment = await Comment.create({deviceId, body, userId: req.user.id})
        
        return res.json(comment)
    }
    async getComments(req, res, next) {
        try{
        const {deviceId} = req.query
        const comments = await Comment.findAll({where: {deviceId}})

        let commentsWithNames = []

        for (let i = 0; i < comments.length; i++) {
            const user = await User.findOne({where: {id: comments[i].userId}})
            commentsWithNames.push({comment: comments[i], userName: user.userName})
        }

        return res.json(commentsWithNames.reverse())

        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CommentController()