const STATUSES = ['pending', 'purchased'];
const ALLOWED = ['name', 'quantity', 'unit', 'status'];

function validateShoppingItem(input, { partial = false } = {}) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return ['Request body must be a JSON object'];
  for (const key of Object.keys(input)) if (!ALLOWED.includes(key)) errors.push(`Unknown field: ${key}`);
  if (!partial || Object.hasOwn(input, 'name')) {
    if (typeof input.name !== 'string' || !input.name.trim()) errors.push('name is required and must be a non-empty string');
    else if (input.name.trim().length > 200) errors.push('name must be 200 characters or fewer');
  }
  if (!partial || Object.hasOwn(input, 'quantity')) {
    if (typeof input.quantity !== 'number' || !Number.isFinite(input.quantity) || input.quantity <= 0) errors.push('quantity must be a number greater than zero');
  }
  if (Object.hasOwn(input, 'unit') && (typeof input.unit !== 'string' || input.unit.length > 50)) errors.push('unit must be a string of at most 50 characters');
  if (Object.hasOwn(input, 'status') && !STATUSES.includes(input.status)) errors.push(`status must be one of: ${STATUSES.join(', ')}`);
  return errors;
}

module.exports = { validateShoppingItem, STATUSES };
