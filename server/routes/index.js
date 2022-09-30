const Router = require('express')
const router = new Router()
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)


module.exports = router