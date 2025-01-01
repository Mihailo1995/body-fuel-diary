import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { connectDB } from './config/db'
import { foodRouter } from './routes/food.route'

dotenv.config() // dotenv enables us to load environment variables from a .env file into process.env

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json()) // allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use('/api/foods', foodRouter)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server started at http://localhost:${PORT}`)
})
