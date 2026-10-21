const { createResourceService } = require('./resourceService');
module.exports = createResourceService('shoppingItems', {
  unit: '',
  status: 'pending'
}, ['status']);
