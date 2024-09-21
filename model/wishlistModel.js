const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wishlist: []
})

const wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = wishlist