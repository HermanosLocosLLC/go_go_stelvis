import request from 'supertest';
import { app } from '../../../app';
import pgPool from '../../../db/pgPool';
import { Email } from '../../../utils/email/email';

const sendSignupConfirmationMock = jest
  .spyOn(Email.prototype, 'sendSignupConfirmation')
  .mockImplementation(async () => {})
  .mockName('MOCK Email.sendSignupConfirmation');

const signupUrl = '/api/v1/auth/gogo/signup';

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

  it('returns both validation errors for bad email and password', async () => {
    const response = await request(app).post(signupUrl).send({
      email: 'derp',
      password: 'derp',
    });

    expect(response.status).toEqual(400);
    expect(response.body.length).toEqual(2);
  });

  it('Successfully creates user and sends signup confirmation email', async () => {
    const email = 'test@test.com';

    const response = await request(app).post(signupUrl).send({
      email,
      password: 'ilovetesting789!',
    });

    expect(response.status).toEqual(201);

    const query = `SELECT * FROM users WHERE email=$1;`;
    const {
      rows: [newUser],
    } = await pgPool.query(query, [email]);
    expect(newUser).toBeDefined();
    expect(newUser.email).toEqual(email);

    expect(sendSignupConfirmationMock).toHaveBeenCalledTimes(1);
  });
});
