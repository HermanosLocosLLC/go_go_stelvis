import path from 'path'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import apiRouter from './routes'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()

app.use(express.json())
app.use(cors())

// ROUTE FOR SERVING FRONT END
app.use('/', express.static(path.join(__dirname, '/../client/dist')))

// API ROUTES
app.use('/api/v1', apiRouter)

// NOT FOUND ROUTE HANDLER
app.use((req, res) => {
  throw new NotFoundError()
})

// GLOBAL ERROR HANDLER
app.use(errorHandler)

export { app }
