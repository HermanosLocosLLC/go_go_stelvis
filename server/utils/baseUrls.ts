export const clientBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5150'
    : process.env.NODE_ENV === 'test'
      ? 'http://localhost:5150'
      : 'http://<production_url>';
