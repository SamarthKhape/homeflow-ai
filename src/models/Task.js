const STATUSES = ['pending', 'in_progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];
const ALLOWED = ['title', 'description', 'dueDate', 'priority', 'status'];

function validateTask(input, { partial = false } = {}) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return ['Request body must be a JSON object'];
  }
  for (const key of Object.keys(input)) {
    if (!ALLOWED.includes(key)) errors.push(`Unknown field: ${key}`);
  }
  if (!partial || Object.hasOwn(input, 'title')) {
    if (typeof input.title !== 'string' || !input.title.trim()) errors.push('title is required and must be a non-empty string');
    else if (input.title.trim().length > 200) errors.push('title must be 200 characters or fewer');
  }
  if (Object.hasOwn(input, 'description') && (typeof input.description !== 'string' || input.description.length > 5000)) errors.push('description must be a string of at most 5000 characters');
  if (Object.hasOwn(input, 'dueDate') && input.dueDate !== null && !isDate(input.dueDate)) errors.push('dueDate must be a real YYYY-MM-DD date or null');
  if (Object.hasOwn(input, 'priority') && !PRIORITIES.includes(input.priority)) errors.push(`priority must be one of: ${PRIORITIES.join(', ')}`);
  if (Object.hasOwn(input, 'status') && !STATUSES.includes(input.status)) errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  return errors;
}

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

module.exports = { validateTask, STATUSES, PRIORITIES };
