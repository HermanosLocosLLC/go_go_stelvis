import request from 'supertest';
import { app } from '../../../app';

it('🧪 test', async () => {
  const response = await request(app)
    .get('/api/v1/auth/google/login?code=fakeGoogleAuthCode')
    .send();

  expect(response.status).toEqual(500);
});
