require('dotenv').config();

const { connectDb } = require('./config/db');
const app = require('./app');

async function main() {
  const port = Number(process.env.PORT || 3000);
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI in .env');
  }

  await connectDb(mongoUri);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});