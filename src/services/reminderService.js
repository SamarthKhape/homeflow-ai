import { apiRequest } from './api'
export const reminderService = { list: () => apiRequest('/reminders'), create: (reminder) => apiRequest('/reminders', {method:'POST',body:JSON.stringify(reminder)}), update: (id, patch) => apiRequest(`/reminders/${id}`, {method:'PATCH',body:JSON.stringify(patch)}), remove: (id) => apiRequest(`/reminders/${id}`, {method:'DELETE'}) }
