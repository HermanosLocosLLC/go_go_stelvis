import request from 'supertest'
import { app } from '../../../app'

// Mongo Memory Server - Users collection always starts out empty**

// TODO//
it('test', async () => {
  const response = await request(app)
    .post('/api/v1/v-auth/signup')
    .send()
    .expect(200)

  expect(response.body.msg).toEqual('💥 Test Signup')
})
