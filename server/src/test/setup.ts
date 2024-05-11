// import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

interface globalLoginInterface {
  cookie: string[] | undefined
  email: string
  password: string
}

declare global {
  function login(): Promise<globalLoginInterface>
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'derpdeedpp'
  process.env.JWT_LIFETIME = '60s'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  // mongo = await MongoMemoryServer.create()
  // const mongoUri = mongo.getUri()
  const mongoUri = 'mongodb://gogo-mongo-test:27017/gogo-testdb'

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop()
  }
  await mongoose.connection.close()
})

global.login = async () => {
  const email = 'test@test.com'
  const password = 'ilovetesting789!'

  const response = await request(app)
    .post('/api/v1/auth/gogo/signup')
    .send({
      email,
      password,
    })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return { cookie, email, password }
}
