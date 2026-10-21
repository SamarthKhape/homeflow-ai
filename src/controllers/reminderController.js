const service = require('../services/reminderService');
const { validateReminder } = require('../models/Reminder');
const { makeController } = require('./resourceControllerFactory');
module.exports = makeController(service, validateReminder);
