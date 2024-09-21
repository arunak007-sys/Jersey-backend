const express = require('express')
const { signup, logout, signin } = require('../controller/authController')

const route = express.Router()

route.post('/signup', signup)
route.post('/signin', signin)
route.post('/logout/:userId', logout)

module.exports = route
