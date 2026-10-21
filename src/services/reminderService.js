const { createResourceService } = require('./resourceService');
module.exports = createResourceService('reminders', { status: 'pending' }, ['status']);
