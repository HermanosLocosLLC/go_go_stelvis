import mongoose from 'mongoose'
import { app } from './app'
import { DatabaseConnectionError } from './errors/database-connection-error'

const PORT = process.env.PORT || 3000

const start = async () => {
  // CHECK FOR ENVIRONMENTAL VARIABLES
  if (!process.env.JWT_SECRET) throw Error('❌ JWT_SECRET must be defined')
  if (!process.env.JWT_LIFETIME) throw Error('❌ JWT_LIFETIME must be defined')
  if (!process.env.MONGO_URI) throw Error('❌ MONGO_URI must be defined')
  if (!process.env.GOOGLE_CLIENT_ID)
    throw Error('❌ GOOGLE_CLIENT_ID must be defined')
  if (!process.env.GOOGLE_CLIENT_SECRET)
    throw Error('❌ GOOGLE_CLIENT_SECRET must be defined')
  if (!process.env.GOOGLE_REDIRECT_URL)
    throw Error('❌ GOOGLE_REDIRECT_URL must be defined')
  if (!process.env.AWS_ACCESS_KEY)
    throw Error('❌ AWS_ACCESS_KEY must be defined')
  if (!process.env.AWS_SECRET_ACCESS_KEY)
    throw Error('❌ AWS_SECRET_ACCESS_KEY must be defined')

  try {
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('🍃 Connected to the database')
  } catch (error) {
    throw new DatabaseConnectionError()
  }

  app.listen(PORT, () => {
    console.log(`💥 App listening on port ${PORT}`)
  })
}

start()
