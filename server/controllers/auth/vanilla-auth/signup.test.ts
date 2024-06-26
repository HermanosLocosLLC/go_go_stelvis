import request from 'supertest';
import { app } from '../../../app';
import pgPool from '../../../db/pgPool';

const signupUrl = '/api/v1/auth/gogo/signup';

/*eslint jest/no-disabled-tests: "off" */

describe('🧪 Vanilla-Signup Unit Tests 🧪', () => {
  it('throws an error for invalid emails', async () => {
    const { status: status1 } = await request(app)
      .post(signupUrl)
      .send({ email: 'notAnEmail', password: 'validPassword1234!' });

    expect(status1).toEqual(400);

    const { status: status2 } = await request(app)
      .post(signupUrl)
      .send({ email: 'almostAnEmail@testcom', password: 'validPassword1234!' });

    expect(status2).toEqual(400);
  });

  it('throws an error with invalid password', async () => {
    // No special character
    const { status: status1 } = await request(app).post(signupUrl).send({
      email: 'test@test.com',
      password: 'ilovetesting789',
    });

    expect(status1).toEqual(400);

    // Not long enough
    const { status: status2 } = await request(app).post(signupUrl).send({
      email: 'test@test.com',
      password: '2Short',
    });

    expect(status2).toEqual(400);

    // too long
    const { status: status3 } = await request(app).post(signupUrl).send({
      email: 'test@test.com',
      password: 'wowThis1Password!isWayTooLong',
    });

    expect(status3).toEqual(400);
  });

  it('Successfully signs up user and sets cookie', async () => {
    const email = 'test@test.com';

    const response = await request(app).post(signupUrl).send({
      email,
      password: 'ilovetesting789!',
    });

    expect(response.status).toEqual(201);

    console.log('💥 pgPool', pgPool);
    const query = `SELECT * FROM users WHERE email=$1;`;
    const { rows } = await pgPool.query(query, [email]);
    expect(rows[0]).toBeDefined();
    expect(rows[0].email).toEqual(email);

    expect(response.get('Set-Cookie')).toBeDefined();
    expect(response.get('Set-Cookie')![0].split('=')[0]).toEqual('token');
  });
});
