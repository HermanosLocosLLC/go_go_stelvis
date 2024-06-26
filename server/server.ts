import { app } from './app';
import { checkEnvVars } from './utils/checkEnvVars';

const PORT = process.env.PORT || 3000;

const start = async () => {
  checkEnvVars();

  app.listen(PORT, () => {
    console.log(`💥 App listening on port ${PORT}`);
  });
};

start();
