const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const stripeRouter = require('./routes/stripe')

const app = express()

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log('DB Connection Successfull!'))
    .catch((erro)=>{
        console.log(err)
    })

    app.use(cors())
    app.use(express.json())
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/api/orders', orderRouter)
    app.use('/api/checkout', stripeRouter)


app.listen( process.env.PORT || 5000, () => {
    console.log('Backend server is running!🚀')
})