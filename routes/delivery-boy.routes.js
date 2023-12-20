const router = require('express').Router()
const DeliveryBoyControllers = require('../controllers/delivery-boy.controller')
const authorize = require('../middleWare/authorize')
const uploaders = require('../utils/uploaders')

const {ImageUploader} = uploaders

router.post('/', DeliveryBoyControllers.createDeliveryBoy)

router.post('/login', DeliveryBoyControllers.login)

router.get('/', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.getProfile)

router.patch('/', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.patchProfile)

router.put(
	'/',
	authorize.authorizeDeliveryBoy,
	ImageUploader.fields([
		{ name: 'aadharCard', maxCount: 1 },
		{ name: 'panCard', maxCount: 1 },
		{ name: 'drivingLicense', maxCount: 1 },
		{ name: 'photo', maxCount: 1 },
	]),
	DeliveryBoyControllers.putProfileDocuments
)

const DeliveryBoyRoutes = router

module.exports = DeliveryBoyRoutes
