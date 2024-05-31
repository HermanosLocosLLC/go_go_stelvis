import request from 'supertest';
import { app } from '../../app';

const uploadPfpUrl = '/api/v1/user/upload-pfp';

it('Fails when not logged in', async () => {
  const { status } = await request(app).post(uploadPfpUrl).send();

  expect(status).toEqual(401);
});

it('Fails if no image sent in request', async () => {
  const { cookie } = await global.login();
  const { status } = await request(app)
    .post(uploadPfpUrl)
    .set('Cookie', cookie!)
    .send();

  expect(status).toEqual(400);
});
