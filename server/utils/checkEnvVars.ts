export const checkEnvVars = () => {
  // CHECK FOR ENVIRONMENTAL VARIABLES
  if (!process.env.JWT_SECRET) throw Error('❌ JWT_SECRET must be defined');
  if (!process.env.JWT_LIFETIME) throw Error('❌ JWT_LIFETIME must be defined');
  if (!process.env.POSTGRES_USER)
    throw Error('❌ POSTGRES_USER must be defined');
  if (!process.env.POSTGRES_DB) throw Error('❌ POSTGRES_DB must be defined');
  if (!process.env.POSTGRES_PASSWORD)
    throw Error('❌ POSTGRES_PASSWORD must be defined');
  if (!process.env.POSTGRES_HOST)
    throw Error('❌ POSTGRES_HOST must be defined');
  // if (!process.env.MONGO_URI) throw Error('❌ MONGO_URI must be defined');
  if (!process.env.GOOGLE_CLIENT_ID)
    throw Error('❌ GOOGLE_CLIENT_ID must be defined');
  if (!process.env.GOOGLE_CLIENT_SECRET)
    throw Error('❌ GOOGLE_CLIENT_SECRET must be defined');
  if (!process.env.GOOGLE_REDIRECT_URL)
    throw Error('❌ GOOGLE_REDIRECT_URL must be defined');
  if (!process.env.AWS_ACCESS_KEY)
    throw Error('❌ AWS_ACCESS_KEY must be defined');
  if (!process.env.AWS_SECRET_ACCESS_KEY)
    throw Error('❌ AWS_SECRET_ACCESS_KEY must be defined');
}