const service = require('../services/conversationService');
const { validateConversation } = require('../models/Conversation');
const { makeController } = require('./resourceControllerFactory');
module.exports = makeController(service, validateConversation);
