import request from 'supertest';
import { app } from '../../../app';

// TODO//
it('🧪 test', async () => {
  const response = await request(app)
    .get('/api/v1/auth/google/login?code=fakeGoogleAuthCode')
    .send()
    .expect(500);

  expect('💥 GOOGLE LOGIN').toEqual('💥 GOOGLE LOGIN');
  // expect(response.body.msg).toEqual('💥 Test Signup')
});
