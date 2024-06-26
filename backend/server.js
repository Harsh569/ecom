import express from 'express';
import products from './data/products.js';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';
const port = process.env.PORT || 7000;
connectDB()
const app = express()
//Body parse middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

//cookie parser middleware
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("API is running..........")
});


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})