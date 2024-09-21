const express = require('express')
const { createProduct, getProduct, deleteProduct, productUpdate } = require('../controller/productController')

const route = express.Router()

route.post('/createProduct', createProduct)
route.get('/getProduct', getProduct)
route.delete('/deleteProduct/:productId', deleteProduct)
route.put('/productUpdate/:productId', productUpdate)

module.exports = route
