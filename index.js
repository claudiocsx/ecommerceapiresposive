const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')

const app = express()

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log('DB Connection Successfull!'))
    .catch((erro)=>{
        console.log(err)
    })

    app.use(express.json())
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/products', productRouter)


app.listen( process.env.PORT || 5000, () => {
    console.log('Backend server is running!🚀')
})