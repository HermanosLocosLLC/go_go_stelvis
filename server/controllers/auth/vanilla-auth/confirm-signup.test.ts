import request from 'supertest';
import { app } from '../../../app';

const gogoConfirmSignupUrl = '/api/v1/auth/gogo/confirm-signup';

describe('🧪 Vanilla Confirm Signup Unit Tests 🧪', () => {
  it('🧪 Fails if no valid request query token', async () => {
    const response = await request(app).post(gogoConfirmSignupUrl).send();

    expect(response.status).toEqual(404);
  });
});
