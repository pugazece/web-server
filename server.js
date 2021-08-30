import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'

import userRouter from './routes/userRoutes.js'

// Load environment variables
dotenv.config()

// Initialize server
const app = express()
app.use(express.json())
app.use(cors())
app.use(
  morgan(
    '[:date[web]] :method :url :status :res[content-length] - :response-time ms'
  )
)

// Setup routes
app.use('/api/v1/user', userRouter)

// Connect to database
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error('Error connecting to database: ', error))

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
