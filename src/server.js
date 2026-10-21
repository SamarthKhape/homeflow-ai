require('dotenv').config();
const app = require('./app');
const { connectDatabase } = require('./config/database');

const port = Number(process.env.PORT) || 3000;

async function start() {
  try {
    const database = await connectDatabase();
    app.listen(port, () => {
      console.log(`API server running at http://localhost:${port}`);
      console.log(`Storage: ${database.kind} (${database.path})`);
      console.log('Press Ctrl+C to stop the server.');
    });
  } catch (err) {
    console.error('Failed to initialize storage:', err.message);
    process.exitCode = 1;
  }
}

start();
