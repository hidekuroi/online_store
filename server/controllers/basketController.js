const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async add(req, res, next) {
        const {deviceId} = req.body

        if(deviceId) {
            const basket = await Basket.findOne({where: {userId: req.user.id}})
            const basket_device = await BasketDevice.create({basketId: basket.dataValues.id, deviceId})
            return res.json(basket_device)
        }
        else {
            next(ApiError.badRequest("Не указан айди устройства"))
        }
    }
    async getBasketDevices(req, res) {
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const basket_devices = await BasketDevice.findAll({where: {basketId: basket.dataValues.id}, order: [['createdAt', 'ASC']]})

        let devices = []
        let totalPrice = 0

        for (let i = 0; i < basket_devices.length; i++) {        
                const device = await Device.findOne({where: {id: basket_devices[i].deviceId}})
                
                if(!device) {
                    devices.push({basketDeviceId: basket_devices[i].id, deviceInfo: {id: -1, name: "Данное устройство удалено", price: 0, rating: 0, brandId: 0, typeId: 0, img: 'bad.jpg', amount: 0}})
                }
                else{
                    totalPrice = totalPrice + device.price * basket_devices[i].amount
                    devices.push({basketDeviceId: basket_devices[i].id, deviceInfo: device, amount: basket_devices[i].amount})
                }
            }


        return res.json({devices, totalPrice})
    }
    async deleteBasketDevice(req, res) {
        const {basketDeviceId} = req.body
        const basket = await Basket.findOne({where: {userId: req.user.id}})
        const basket_device = await BasketDevice.destroy({where: {basketId: basket.dataValues.id, id: basketDeviceId}})

        return res.json(basket_device)
    }
    async updateAmount(req, res) {
        const {basketDeviceId, amount} = req.body

        const updated_device = await BasketDevice.update({amount}, {where: {id: basketDeviceId}})
        
        return res.json(updated_device)
    }
}

module.exports = new BasketController()