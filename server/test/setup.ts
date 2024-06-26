import request from 'supertest';
import { app } from '../app';

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
});

// afterAll(async () => {});

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
