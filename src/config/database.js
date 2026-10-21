const fs = require('node:fs/promises');
const path = require('node:path');

const configuredPath = process.env.DATA_FILE || './data/db.json';
const dataPath = path.resolve(process.cwd(), configuredPath);

const emptyDatabase = () => ({
  tasks: [],
  shoppingItems: [],
  reminders: [],
  conversations: []
});

async function connectDatabase() {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });

  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify(emptyDatabase(), null, 2), 'utf8');
  }

  // Fail early if the file is unreadable or invalid JSON.
  const parsed = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  const initial = emptyDatabase();
  const normalized = { ...initial, ...parsed };
  for (const key of Object.keys(initial)) {
    if (!Array.isArray(normalized[key])) normalized[key] = [];
  }
  await fs.writeFile(dataPath, JSON.stringify(normalized, null, 2), 'utf8');
  return { kind: 'json-file', path: dataPath };
}

async function readDatabase() {
  const raw = await fs.readFile(dataPath, 'utf8');
  const db = JSON.parse(raw);
  const initial = emptyDatabase();
  return { ...initial, ...db };
}

// Serialize writes within this Node process to avoid overlapping read-modify-write operations.
let writeQueue = Promise.resolve();
function writeDatabase(db) {
  const write = async () => {
    const tempPath = `${dataPath}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(db, null, 2), 'utf8');
    await fs.rename(tempPath, dataPath);
  };
  writeQueue = writeQueue.then(write, write);
  return writeQueue;
}

module.exports = { connectDatabase, readDatabase, writeDatabase };
