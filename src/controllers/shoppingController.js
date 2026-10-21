const service = require('../services/shoppingService');
const { validateShoppingItem } = require('../models/ShoppingItem');
const { makeController } = require('./resourceControllerFactory');
module.exports = makeController(service, validateShoppingItem);
