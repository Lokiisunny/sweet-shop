import { createApp } from './app.js';
import { config } from './config.js';
import { connectMongo } from './db.js';

const app = createApp();

connectMongo(config.mongoUri).then(() => {
  app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}`);
  });
}).catch((e) => {
  console.error('Failed to connect to MongoDB', e);
  process.exit(1);
});


