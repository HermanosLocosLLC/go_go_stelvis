import path from 'path'
import express from 'express'
import 'express-async-errors'
// only needed when not dockerized
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '/../../.env') })
import cors from 'cors'
import apiRouter from './routes'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import cookieParser from 'cookie-parser'
import { clientBaseUrl } from './utils/baseUrls'

const app = express()

app.use(
  cors({
    credentials: true,
    origin: clientBaseUrl,
  }),
)
app.use(express.json())
app.use(cookieParser())

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
