const express = require('express')
const { addToCart, getCart, removeCart,addToWishlist, getWishlist, removeWishlist, increementCartQuantity } = require('../controller/userController')

const route = express.Router()

route.put("/addToCart/:userId", addToCart)
route.get("/getCart/:userId", getCart)
route.post("/removeCart/:userId", removeCart)

route.put("/increementCartQuantity/:userId", increementCartQuantity)

route.put("/addToWishlist/:userId", addToWishlist)
route.get("/getWishlist/:userId", getWishlist)
route.post("/removeWishlist/:userId", removeWishlist)

module.exports = route
