import request from 'supertest';
import { app } from '../../../app';

/*eslint jest/no-disabled-tests: "off" */

describe('🧪 Google-OAuth-Login Unit Tests 🧪', () => {
  it('TODO It is temporary...', () => {
    expect('TODO').toEqual('TODO');
  });

  xit('🧪 It returns a 500 with invalid Google OAuth code', async () => {
    const response = await request(app)
      .get('/api/v1/auth/google/login?code=fakeGoogleAuthCode')
      .send();

    expect(response.status).toEqual(500);
  });
});
