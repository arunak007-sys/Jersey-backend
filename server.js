const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoute = require('./route/authRoute')
const productRoute = require('./route/productRoute')
const userRoute = require('./route/userRoute')

const connectDB = require('./config/db')

require('dotenv').config()

const app = express()

const PORT = process.env.APP_PORT || 8000

app.use(express.json())

app.use(cookieParser())
app.use(cors())

// app.use(
//     "*",
//     async (req, res, next) => {
//       res.status(404).json({
//         status:'fail',
//         message:'Route not found'
//       })
//     }
//   );

connectDB()

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/user', userRoute)

app.listen(PORT, ()=>{
    console.log(`Server is listening on the port ${PORT}`)
})