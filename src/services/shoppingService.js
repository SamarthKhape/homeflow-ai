import { apiRequest } from './api'
export const shoppingService = { list: () => apiRequest('/shopping'), create: (item) => apiRequest('/shopping', {method:'POST',body:JSON.stringify(item)}), update: (id, patch) => apiRequest(`/shopping/${id}`, {method:'PATCH',body:JSON.stringify(patch)}), remove: (id) => apiRequest(`/shopping/${id}`, {method:'DELETE'}) }
