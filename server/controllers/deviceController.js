const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Comment, User} = require('../models/models')
const { Op } = require("sequelize");
const { Sequelize } = require('../db');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
            
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, res) {
        let {brandId, typeId, limit, page, searchQuery} = req.query
        limit = limit || 16
        page = page || 1
        let offset = page * limit - limit

        let devices;
        if(!brandId && !typeId) {
            //devices = await Device.findAndCountAll({limit, offset})
            if(searchQuery) {
                devices = await Device.findAndCountAll({where: {
                    name: {[Op.iLike]: `%${searchQuery}%`}
                }, limit, offset})
            }
            else devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }



        return res.json(devices)
    }
    async getOne(req, res, next) {
        try{
            const {id} = req.params
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}]
                },
            )
            return res.json(device)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        const {id} = req.body
        const deviceInfo = await DeviceInfo.destroy({where: {deviceId: id}})
        const comments = await Comment.destroy({where: {deviceId: id}})
        const count = await Device.destroy(
            {
                where: {id},
            }
        )
        return res.json(count)
    }
}

module.exports = new DeviceController()