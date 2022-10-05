const ApiError = require('../error/ApiError')
const {Device, Rating} = require('../models/models')


class RatingController {
    async addRating(req, res) {
        let {ratingValue, deviceId} = req.body

        ratingValue = Number(ratingValue)

        const isRating = await Rating.findOne({where: {deviceId, userId: req.user.id}})
        let rating = {}

        if(!isRating) rating = await Rating.create({deviceId, value: ratingValue, userId: req.user.id})
        else rating = await Rating.update({value: ratingValue}, {where: {userId: req.user.id, deviceId}})
            const allRating = await Rating.findAll({where: {deviceId}})
            let newRating = 0

            for (let i = 0; i < allRating.length; i++) {
                newRating = newRating + allRating[i].value
            }

            newRating = newRating / allRating.length

            const device = await Device.update({rating: newRating}, {where: {id: deviceId}})

            return res.json(newRating)
    }
    async getGivenRating(req, res) {
        const {deviceId} = req.query

        const rating = await Rating.findOne({where: {deviceId, userId: req.user.id}})

        return res.json(rating)
    }
}

module.exports = new RatingController()