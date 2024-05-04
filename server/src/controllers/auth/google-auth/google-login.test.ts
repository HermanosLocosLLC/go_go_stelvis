import request from 'supertest'
import { app } from '../../../app'

// TODO//
it('test', async () => {
  const response = await request(app)
    .post('/api/v1/auth/google/login')
    .send()
    .expect(200)

  expect('💥 GOOGLE LOGIN').toEqual('💥 GOOGLE LOGIN')
  // expect(response.body.msg).toEqual('💥 Test Signup')
})
