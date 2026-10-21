const { randomUUID } = require('node:crypto');
const { readDatabase, writeDatabase } = require('../config/database');

function createResourceService(collection, defaults, filterKeys = []) {
  async function list(filters = {}) {
    const db = await readDatabase();
    return db[collection].filter((item) => filterKeys.every((key) => !filters[key] || item[key] === filters[key]))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  async function getById(id) {
    const db = await readDatabase();
    return db[collection].find((item) => item.id === id) || null;
  }

  async function create(input) {
    const db = await readDatabase();
    const now = new Date().toISOString();
    const record = {
      id: randomUUID(),
      ...defaults,
      ...input,
      createdAt: now,
      updatedAt: now
    };
    db[collection].push(record);
    await writeDatabase(db);
    return record;
  }

  async function update(id, input) {
    const db = await readDatabase();
    const index = db[collection].findIndex((item) => item.id === id);
    if (index === -1) return null;
    db[collection][index] = {
      ...db[collection][index],
      ...input,
      id: db[collection][index].id,
      createdAt: db[collection][index].createdAt,
      updatedAt: new Date().toISOString()
    };
    await writeDatabase(db);
    return db[collection][index];
  }

  async function remove(id) {
    const db = await readDatabase();
    const index = db[collection].findIndex((item) => item.id === id);
    if (index === -1) return false;
    db[collection].splice(index, 1);
    await writeDatabase(db);
    return true;
  }

  return { list, getById, create, update, remove };
}
module.exports = { createResourceService };
