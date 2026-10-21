import { apiRequest } from './api'
export const taskService = { list: () => apiRequest('/tasks'), create: (task) => apiRequest('/tasks', {method:'POST',body:JSON.stringify(task)}), update: (id, patch) => apiRequest(`/tasks/${id}`, {method:'PATCH',body:JSON.stringify(patch)}), remove: (id) => apiRequest(`/tasks/${id}`, {method:'DELETE'}) }
