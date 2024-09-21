const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB connected successfully")
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB