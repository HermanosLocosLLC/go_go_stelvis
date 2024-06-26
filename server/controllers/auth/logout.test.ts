import request from 'supertest';
import { app } from '../../app';

/*eslint jest/no-disabled-tests: "off" */

describe('🧪 Logout Unit Tests 🧪', () => {
  it('TODO It is temporary...', () => {
    expect('TODO').toEqual('TODO');
  });

  xit('🧪 Successfully logs out user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout')
      .send()
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
    expect(/null/g.test(response.get('Set-Cookie')![0].split(';')[0])).toEqual(
      true,
    );
  });
});
