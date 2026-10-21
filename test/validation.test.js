const test = require('node:test');
const assert = require('node:assert/strict');
const { validateTask } = require('../src/models/Task');
const { validateShoppingItem } = require('../src/models/ShoppingItem');
const { validateReminder } = require('../src/models/Reminder');

test('task accepts valid task and defaults can be applied by service', () => {
  assert.deepEqual(validateTask({ title: 'Study', priority: 'high', dueDate: '2026-12-01' }), []);
});
test('task rejects invalid date and priority', () => {
  assert.ok(validateTask({ title: 'Study', dueDate: '2026-02-30', priority: 'urgent' }).length >= 2);
});
test('shopping item rejects zero quantity', () => {
  assert.ok(validateShoppingItem({ name: 'Milk', quantity: 0 }).length > 0);
});
test('reminder rejects impossible date and invalid time', () => {
  assert.ok(validateReminder({ title: 'Meeting', date: '2026-02-30', time: '25:90' }).length >= 2);
});
