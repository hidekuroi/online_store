require('dotenv').config()
const express = require('express')
const sequlize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)


const start = async () => {
    try{
        await sequlize.authenticate()
        await sequlize.sync()
        app.listen(PORT, () => console.log(`\n \n Server started on port ${PORT} \n \n`))
    } catch(e) {
        console.log(e)
    }
}

start()