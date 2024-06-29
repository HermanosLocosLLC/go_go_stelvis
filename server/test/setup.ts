import request from 'supertest';
import { app } from '../app';
import pgPool from '../db/pgPool';

interface globalLoginInterface {
  cookie: string[] | undefined;
  email: string;
  password: string;
}

declare global {
  function login(): Promise<globalLoginInterface>;
}

beforeAll(async () => {
  process.env.JWT_SECRET = 'derpdeedpp';
  process.env.JWT_LIFETIME = '60s';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
});

beforeEach(async () => {
  jest.clearAllMocks();
  await pgPool.query('DELETE FROM users;');
  await pgPool.query('DELETE FROM trips;');
  await pgPool.query('DELETE FROM destinations;');
  await pgPool.query('DELETE FROM travels;');
  await pgPool.query('DELETE FROM accomodations;');
  await pgPool.query('DELETE FROM activities;');
  await pgPool.query('DELETE FROM invitees;');
});

afterAll(async () => {
  pgPool.end();
});

global.login = async () => {
  const email = 'test@test.com';
  const password = 'ilovetesting789!';

  const response = await request(app)
    .post('/api/v1/auth/gogo/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return { cookie, email, password };
};
