import request from 'supertest'
import { app } from '../../../app'

it('🧪 Fails if either email or password are not provided', async () => {
  await request(app)
    .post('/api/v1/auth/gogo/login')
    .send({
      email: 'test@test.com',
    })
    .expect(400)

  await request(app)
    .post('/api/v1/auth/gogo/login')
    .send({
      password: 'ilovetesting789',
    })
    .expect(400)
})

it('🧪 Fails if user does not exist', async () => {
  await request(app)
    .post('/api/v1/auth/gogo/login')
    .send({
      email: 'nonexistentuser@fail.com',
      password: 'pleaseLetMeIn1234',
    })
    .expect(400)
})

it('🧪 Fails if passwords do not match', async () => {
  await request(app)
    .post('/api/v1/auth/gogo/login')
    .send({
      username: 'test@test.com',
      password: 'ilovetesting123',
    })
    .expect(400)
})

it("🧪 Sets cookie 'token' on successful login", async () => {
  const { email, password } = await global.login()

  const response = await request(app)
    .post('/api/v1/auth/gogo/login')
    .send({
      email,
      password,
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
  expect(response.get('Set-Cookie')![0].split('=')[0]).toEqual('token')
})
