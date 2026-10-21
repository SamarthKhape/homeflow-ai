const STATUSES = ['pending', 'completed'];
const ALLOWED = ['title', 'date', 'time', 'status'];

function isDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateReminder(input, { partial = false } = {}) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return ['Request body must be a JSON object'];
  for (const key of Object.keys(input)) if (!ALLOWED.includes(key)) errors.push(`Unknown field: ${key}`);
  if (!partial || Object.hasOwn(input, 'title')) {
    if (typeof input.title !== 'string' || !input.title.trim()) errors.push('title is required and must be a non-empty string');
    else if (input.title.trim().length > 200) errors.push('title must be 200 characters or fewer');
  }
  if (!partial || Object.hasOwn(input, 'date')) {
    if (!isDate(input.date)) errors.push('date must be a real YYYY-MM-DD calendar date');
  }
  if (!partial || Object.hasOwn(input, 'time')) {
    if (typeof input.time !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)) errors.push('time must use 24-hour HH:mm format');
  }
  if (Object.hasOwn(input, 'status') && !STATUSES.includes(input.status)) errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  return errors;
}

module.exports = { validateReminder, STATUSES };
