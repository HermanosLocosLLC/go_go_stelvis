import request from 'supertest'
import { app } from '../../app'

const getCurrentUserUrl = '/api/v1/user/'

it('🧪 Responds with appropriate message if no current user', async () => {
  const response = await request(app)
    .get(getCurrentUserUrl)
    .send({})
    .expect(200)

  expect(response.body.message).toEqual('No current user')
})

it('🧪 Successfully returns the current user', async () => {
  const { cookie, email } = await global.login()

  const response = await request(app)
    .get(getCurrentUserUrl)
    .set('Cookie', cookie!)
    .send({})
    .expect(200)

  expect(response.body.email).toEqual(email)
})
