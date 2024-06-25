// import mongoose from 'mongoose';
import { app } from './app';
import { checkEnvVars } from './utils/checkEnvVars';
// import { DatabaseConnectionError } from './errors/database-connection-error';

const PORT = process.env.PORT || 3000;

const start = async () => {
  checkEnvVars();

  // try {
  //   await mongoose.connect(process.env.MONGO_URI, {});
  //   console.log('🍃 Connected to the database');
  // } catch (error) {
  //   throw new DatabaseConnectionError();
  // }

  app.listen(PORT, () => {
    console.log(`💥 App listening on port ${PORT}`);
  });
};

start();
