export const APP_NAME = 'HomeFlow AI'
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { label: 'AI Assistant', path: '/assistant', icon: 'Sparkles' },
  { label: 'Tasks', path: '/tasks', icon: 'CheckSquare' },
  { label: 'Shopping List', path: '/shopping', icon: 'ShoppingCart' },
  { label: 'Reminders', path: '/reminders', icon: 'Bell' },
]

export const MOCK_TASKS = [
  { id: 't1', title: 'Check water heater before trip', category: 'Home', dueDate: '2026-10-22', completed: false },
  { id: 't2', title: 'Take out kitchen recycling', category: 'Chores', dueDate: '2026-10-22', completed: false },
  { id: 't3', title: 'Lock all windows', category: 'Security', dueDate: '2026-10-21', completed: true },
  { id: 't4', title: 'Prepare pet supplies', category: 'Pets', dueDate: '2026-10-23', completed: false },
]

export const MOCK_SHOPPING = [
  { id: 's1', name: 'Dishwasher tablets', quantity: 1, purchased: false },
  { id: 's2', name: 'Milk', quantity: 2, purchased: false },
  { id: 's3', name: 'LED bulbs', quantity: 4, purchased: true },
  { id: 's4', name: 'Laundry detergent', quantity: 1, purchased: false },
]

export const MOCK_REMINDERS = [
  { id: 'r1', title: 'Put bins out', datetime: '2026-10-22T20:00', status: 'Scheduled' },
  { id: 'r2', title: 'Water indoor plants', datetime: '2026-10-23T09:00', status: 'Scheduled' },
  { id: 'r3', title: 'Review travel checklist', datetime: '2026-10-21T22:00', status: 'Completed' },
]
