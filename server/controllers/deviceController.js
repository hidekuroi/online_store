const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Device, DeviceInfo, Comment, DeviceImage, Rating, Brand} = require('../models/models')
const { Op } = require("sequelize");

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

            if(req.files?.imgs) {
                if(req.files?.imgs.length) {
                    for (let i = 0; i < req.files.imgs.length; i++) {

                        const img = req.files.imgs[i]
                        const fileName = uuid.v4() + '.jpg'
                        img.mv(path.resolve(__dirname, '..', 'static', fileName))
                        
                        const device_img = await DeviceImage.create({deviceId: device.id, img: fileName})
                    }
                }
                else {
                    const img = req.files.imgs
                    const fileName = uuid.v4() + '.jpg'

                    img.mv(path.resolve(__dirname, '..', 'static', fileName))
                        
                    const device_img = await DeviceImage.create({deviceId: device.id, img: fileName})
                }
            }
            
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }  
    }
    async updateDevice(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, id} = req.body
            let img = {}
            let fileName = ''
            if(req.files) {
                if(req.files?.img) {
                    img = req.files.img
                    fileName = uuid.v4() + '.jpg'
                    img.mv(path.resolve(__dirname, '..', 'static', fileName))
                }
            }
            let device = {} 
            if(req.files?.img){
                device = await Device.update({name, price, brandId, typeId, img: fileName}, {where: {id}})
            }
            else {
                device = await Device.update({name, price, brandId, typeId}, {where: {id}})
            }

                if(req.files?.imgs) {
                    if(req.files.imgs.length){
                        for (let i = 0; i < req.files.imgs.length; i++) {

                            const img = req.files.imgs[i]
                            const fileName = uuid.v4() + '.jpg'
                            img.mv(path.resolve(__dirname, '..', 'static', fileName))
                            
                            const device_img = await DeviceImage.create({deviceId: id, img: fileName})
                        }
                    }
                    else {
                        const img = req.files.imgs
                        const fileName = uuid.v4() + '.jpg'

                        img.mv(path.resolve(__dirname, '..', 'static', fileName))
                            
                        const device_img = await DeviceImage.create({deviceId: id, img: fileName})
                    }
                }
            

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    if(i.id){
                        if(i.toDelete == false){
                        DeviceInfo.update(
                            {
                            title: i.title,
                            description: i.description,
                            }, {where: {id: i.id}}
                        )
                    }
                        if(i.toDelete == true) {
                            DeviceInfo.destroy({where: {id: i.id}})
                        }
                    }
                    else{
                        DeviceInfo.create({
                            title: i.title,
                            description: i.description,
                            deviceId: id
                    })
                }
                });
            }
            
            return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }  
    }
    async getAll(req, res) {
        let {brandId, typeId, limit, page, searchQuery, orderBy, order} = req.query
        limit = limit || 16
        page = page || 1
        let offset = page * limit - limit

        order = order || 'ASC'
        orderBy = orderBy || 'id'

        let devices;
        if(!brandId && !typeId) {
            //devices = await Device.findAndCountAll({limit, offset})
            if(searchQuery) {
                devices = await Device.findAndCountAll({where: {
                    name: {[Op.iLike]: `%${searchQuery}%`}
                }, limit, offset, order: [[orderBy, order]]})
            }
            else devices = await Device.findAndCountAll({limit, offset, order: [[orderBy, order]]})
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset, order: [[orderBy, order]]})
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset, order: [[orderBy, order]]})
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset, order: [[orderBy, order]]})
        }



        return res.json(devices)
    }
    async getOne(req, res, next) {
        try{
            const {id} = req.params
            const device = await Device.findOne(
                {
                    where: {id},
                    include: [{model: DeviceInfo, as: 'info'}, {model: DeviceImage, as: 'images'}],
                    order: [[{ model: DeviceInfo, as: 'info' }, 'id', 'ASC']]
                },
            )
            const brand = await Brand.findOne({where: {id: device.brandId}})
            if(brand) device.dataValues.brandName = brand.name
            return res.json(device)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res) {
        const {id} = req.body

        const device = await Device.findOne({where: {id}})
        fs.rmSync(path.resolve(__dirname, '..', 'static', device.img), {
            force: true
        })
        const additionalImages = await DeviceImage.findAll({where: {deviceId: id}})
        additionalImages.forEach((i) => {
            fs.rmSync(path.resolve(__dirname, '..', 'static', i.dataValues.img), {
                force: true
            })
        })

        const deviceImages = await DeviceImage.destroy({where: {deviceId: id}})
        const deviceInfo = await DeviceInfo.destroy({where: {deviceId: id}})
        const comments = await Comment.destroy({where: {deviceId: id}})
        const rating = await Rating.destroy({where: {deviceId: id}})
        const count = await Device.destroy(
            {
                where: {id},
            }
        )
        return res.json(count)
    }

    
}

module.exports = new DeviceController()