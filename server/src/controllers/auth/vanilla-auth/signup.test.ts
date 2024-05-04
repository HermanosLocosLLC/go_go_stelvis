import request from 'supertest'
import { app } from '../../../app'

// TODO//
it('test', async () => {
  const response = await request(app)
    .post('/api/v1/auth/gogo/signup')
    .send()
    .expect(200)

  expect(response.body.msg).toEqual('💥 Test Signup')
})
