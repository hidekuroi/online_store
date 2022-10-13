const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role, userName) => {
    return jwt.sign(
    {id, email, role, userName},
    process.env.HASH_KEY,
    {expiresIn: '24h'}
)
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, userName} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль."))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, userName})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.userName)
        return res.json({token})
    }
            
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal("Пользователь с таким email не существует"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal("Неверный пароль."))
        }
        const token = generateJwt(user.id, user.email, user.role, user.userName)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.userName)
        return res.json({token})
    }

    async updateUser(req, res, next) {
        const {userName} = req.body

        const userUpdated = await User.update({userName},{where: {id: req.user.id}})
        const user = await User.findOne({where:{id: req.user.id}})
        const token = generateJwt(user.id, user.email, user.role, user.userName)
        return res.json({token})
    }
}

module.exports = new UserController()