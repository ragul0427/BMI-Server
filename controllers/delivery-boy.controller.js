const Admin = require('../modals/adminUserModal')
const jwt = require('jsonwebtoken')
const DeliveryBoy = require('../modals/delivery-boy')
const {validate} = require('super-easy-validator');

async function login(req, res) {
	try {
		const { username, password } = req.body

    const rules = {
      username: 'username',
      password: 'string|min:3'
    }
    const {errors} = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}

		const deliveryBoy = await DeliveryBoy.findOne({ username })
		if (!deliveryBoy) {
			return res.status(404).json({ message: 'Delivery boy with this username does not found' })
		}

		if (deliveryBoy.password !== password) {
			return res.status(401).json({ message: 'Authentication failed' })
		}

		const token = jwt.sign({ username }, process.env.SECRET_KEY)
		return res.json({ token })
	} catch (error) {
		console.error(error)
	}
}

async function createDeliveryBoy(req, res) {
	try {
		const { username, password } = req.body

    const rules = {
      username: 'username',
      password: 'string|min:3'
    }
    const {errors} = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}

    const db = await DeliveryBoy.findOne({username})
    if(db) {
      return res.status(409).json({message: 'Delivery boy already exist'})
    }

		const deliveryBoy = await DeliveryBoy.create({ username, password })
    deliveryBoy.password = undefined;

		return res.json({ deliveryBoy })
	} catch (error) {
		console.error(error)
	}
}

async function getProfile(req, res) {
	try {
    const deliveryBoy = req.deliveryBoy
    deliveryBoy.password = undefined
		return res.json({deliveryBoy})
	} catch (error) {
		console.error(error)
	}
}

const DeliveryBoyControllers = {
  createDeliveryBoy,
	login,
  getProfile
}

module.exports = DeliveryBoyControllers
