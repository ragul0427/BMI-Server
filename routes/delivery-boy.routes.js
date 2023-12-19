const router = require("express").Router();
const DeliveryBoyControllers = require('../controllers/delivery-boy.controller');
const authorize = require('../middleWare/authorize');

router.post('/', DeliveryBoyControllers.createDeliveryBoy);

router.post('/login', DeliveryBoyControllers.login);

router.get('/profile', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.getProfile);

const DeliveryBoyRoutes = router;

module.exports = DeliveryBoyRoutes;