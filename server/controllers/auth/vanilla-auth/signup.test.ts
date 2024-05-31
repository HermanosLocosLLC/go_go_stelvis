import request from 'supertest'
import { app } from '../../../app'
import { User } from '../../../models/user'

const signupUrl = '/api/v1/auth/gogo/signup'

it('🧪 throws an error for invalid emails', async () => {
  await request(app)
    .post(signupUrl)
    .send({ email: 'notAnEmail', password: 'validPassword1234!' })
    .expect(400)

  await request(app)
    .post(signupUrl)
    .send({ email: 'almostAnEmail@testcom', password: 'validPassword1234!' })
    .expect(400)
})

it('🧪 throws an error with invalid password', async () => {
  // No special character
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'ilovetesting789',
    })
    .expect(400)

  // Not long enough
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: '2Short',
    })
    .expect(400)

  // too long
  await request(app)
    .post(signupUrl)
    .send({
      email: 'test@test.com',
      password: 'wowThis1Password!isWayTooLong',
    })
    .expect(400)
})

it('🧪 Successfully signs up user and sets cookie', async () => {
  const email = 'test@test.com'

  const response = await request(app)
    .post(signupUrl)
    .send({
      email,
      password: 'ilovetesting789!',
    })
    .expect(201)

  const user = await User.findOne({ email })
  expect(user).toBeDefined()
  expect(user?.email).toEqual(email)

  expect(response.get('Set-Cookie')).toBeDefined
  expect(response.get('Set-Cookie')![0].split('=')[0]).toEqual('token')
})
