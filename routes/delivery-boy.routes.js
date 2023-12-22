const router = require('express').Router()
const DeliveryBoyControllers = require('../controllers/delivery-boy.controller')
const authorize = require('../middleWare/authorize')
const uploaders = require('../utils/uploaders')

const {ImageUploader, VideoUploader} = uploaders

router.post('/', DeliveryBoyControllers.createDeliveryBoy)

router.post('/login', DeliveryBoyControllers.login)

router.get('/', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.getProfile)

router.patch('/', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.patchProfile)

router.put(
	'/',
	authorize.authorizeDeliveryBoy,
	ImageUploader.fields([
		{ name: 'aadharFront', maxCount: 1 },
		{ name: 'aadharBack', maxCount: 1 },
		{ name: 'panFront', maxCount: 1 },
		{ name: 'panBack', maxCount: 1 },
		{ name: 'rcFront', maxCount: 1 },
		{ name: 'rcBack', maxCount: 1 },
		{ name: 'drivingLicenseFront', maxCount: 1 },
		{ name: 'drivingLicenseBack', maxCount: 1 },
		{ name: 'insuranceFront', maxCount: 1 },
		{ name: 'insuranceBack', maxCount: 1 },
		{ name: 'bikePhotoFront', maxCount: 1 },
		{ name: 'bikePhotoBack', maxCount: 1 },
		{ name: 'photo', maxCount: 1 },
	]),
	DeliveryBoyControllers.putProfileDocuments
)

router.put(
	'/bike-videos',
	authorize.authorizeDeliveryBoy,
	VideoUploader.fields([
		{ name: 'bikeInwardVideo', maxCount: 1 },
		{ name: 'bikeOutwardVideo', maxCount: 1 },
	]),
	DeliveryBoyControllers.putBikeVideos
)

router.get('/orders', authorize.authorizeDeliveryBoy, DeliveryBoyControllers.getOrders)

const DeliveryBoyRoutes = router

module.exports = DeliveryBoyRoutes
