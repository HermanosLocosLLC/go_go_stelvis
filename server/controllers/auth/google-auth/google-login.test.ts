import request from 'supertest';
import { app } from '../../../app';

const googleLoginUrl = '/api/v1/auth/google/login';

describe('🧪 Google-OAuth-Login Unit Tests 🧪', () => {
  it('🧪 It returns a 500 with invalid Google OAuth code', async () => {
    const response = await request(app)
      .get(`${googleLoginUrl}?code=fakeGoogleAuthCode`)
      .send();

    expect(response.status).toEqual(500);
  });
});
