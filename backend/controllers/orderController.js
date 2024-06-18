import asyncHandler from "../middleware/asyncHandler.js"
import Order from '../models/orderModel.js'

const addOrderItems = asyncHandler(async (req, res)=>{
    console.log("hey")
    res.send('add order Items')
})

const getMyOrders = asyncHandler(async (req, res)=>{
    res.send('get my orders')
})

const getOrderById = asyncHandler(async (req, res)=>{
    res.send('get order by id')
})

const updateOrderToPaid = asyncHandler(async (req, res)=>{
    res.send('update order to paid')
})

const updateOrderToDelivered = asyncHandler(async (req, res)=>{
    res.send('update order to delivered')
})

const getOrders = asyncHandler(async (req, res)=>{
    res.send('get all orders')
})

export {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders}