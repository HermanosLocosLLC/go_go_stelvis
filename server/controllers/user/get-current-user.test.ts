import request from 'supertest';
import { app } from '../../app';

const getCurrentUserUrl = '/api/v1/user/';

/*eslint jest/no-disabled-tests: "off" */

describe('🧪 Get-Current-User Unit Tests 🧪', () => {
  it('TODO It is temporary...', () => {
    expect('TODO').toEqual('TODO');
  });

  xit('🧪 Responds with appropriate message if no current user', async () => {
    const response = await request(app)
      .get(getCurrentUserUrl)
      .send({})
      .expect(200);

    expect(response.body.message).toEqual('No current user');
  });

  xit('🧪 Successfully returns the current user', async () => {
    const { cookie, email } = await global.login();

    const response = await request(app)
      .get(getCurrentUserUrl)
      .set('Cookie', cookie!)
      .send({})
      .expect(200);

    expect(response.body.email).toEqual(email);
  });
});
