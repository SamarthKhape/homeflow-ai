const service = require('../services/taskService');
const { validateTask } = require('../models/Task');
const { makeController } = require('./resourceControllerFactory');
module.exports = makeController(service, validateTask);
