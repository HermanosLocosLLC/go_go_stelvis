export const clientBaseUrl =
  process.env.NODE_ENV === 'production'
    ? // TODO
      'http://<production_url>'
    : 'http://localhost:5150';
