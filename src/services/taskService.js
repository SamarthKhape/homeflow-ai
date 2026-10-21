const { createResourceService } = require('./resourceService');
module.exports = createResourceService('tasks', {
  description: '',
  dueDate: null,
  priority: 'medium',
  status: 'pending'
}, ['status', 'priority']);
