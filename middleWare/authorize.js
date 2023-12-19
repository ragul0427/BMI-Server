const jwt = require('jsonwebtoken')
const { model } = require('mongoose');
const DeliveryBoy = require('../modals/delivery-boy');

async function authorizeDeliveryBoy(req, res, next) {
    const authHeader = req.header('Authorization');
	const token = authHeader?.split(' ')[1];
	if(!authHeader.startsWith('Bearer ') || !token) {
		return res.status(401).send('Authorization failed')
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const deliveryBoy = await DeliveryBoy.findOne({ username: decoded.username })
		req.deliveryBoy = deliveryBoy
		next()
	} catch (err) {
		return res.status(401).send('authorization failed')
	}
}

const authorize = {
    authorizeDeliveryBoy
}

module.exports = authorize;