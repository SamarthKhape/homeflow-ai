const ALLOWED = ['title', 'messages'];

function validateConversation(input, { partial = false } = {}) {
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return ['Request body must be a JSON object'];
  for (const key of Object.keys(input)) if (!ALLOWED.includes(key)) errors.push(`Unknown field: ${key}`);
  if (!partial || Object.hasOwn(input, 'title')) {
    if (typeof input.title !== 'string' || !input.title.trim()) errors.push('title is required and must be a non-empty string');
    else if (input.title.trim().length > 200) errors.push('title must be 200 characters or fewer');
  }
  if (Object.hasOwn(input, 'messages') && !Array.isArray(input.messages)) errors.push('messages must be an array');
  return errors;
}
module.exports = { validateConversation };
