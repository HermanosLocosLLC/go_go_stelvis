import { google } from 'googleapis';

const GOOGLE_REDIRECT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1/auth/google/login'
    : process.env.NODE_ENV === 'test'
      ? 'http://localhost:3000/api/v1/auth/google/login'
      : process.env.NODE_ENV === 'production'
        ? undefined
        : undefined;

if (!process.env.GOOGLE_CLIENT_ID)
  throw new Error('❌ process.env.GOOGLE_CLIENT_ID must be defined!');
if (!process.env.GOOGLE_CLIENT_SECRET)
  throw new Error('❌ process.env.GOOGLE_CLIENT_SECRET must be defined!');
if (!process.env.GOOGLE_REDIRECT_URL)
  throw new Error('❌ process.env.GOOGLE_REDIRECT_URL must be defined!');

const googleOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
);

googleOAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

// SET GOOGLE OAUTH2 SCOPES
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/calendar',
];

const googleAuthUrl = googleOAuth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  scope: scopes,
});

export { googleOAuth2Client, googleAuthUrl };
