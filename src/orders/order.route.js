const express = require('express')
const {createOrder} = require('./order.controller.js') 
const {getOrderByEmail} = require('./order.controller.js')
const router = express.Router();

// create order endpoint

router.post("/", createOrder)

// get orders by email
router.get("/email/:email", getOrderByEmail)
module.exports = router