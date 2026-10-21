import { apiRequest } from './api'
export const chatService = { send: (message, conversationId) => apiRequest('/chat', { method:'POST', body: JSON.stringify({ message, conversationId }) }) }
