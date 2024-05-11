import request from 'supertest'
import { app } from '../../app'

const uploadPfpUrl = '/api/v1/user/upload-pfp'

it('Fails when not logged in', async () => {
  await request(app)
    .post(uploadPfpUrl)
    .send()
    .expect(401)
})

it('Fails if no image sent in request', async () => {
  const { cookie } = await global.login()
  await request(app)
    .post(uploadPfpUrl)
    .set('Cookie', cookie!)
    .send()
    .expect(400)
})
