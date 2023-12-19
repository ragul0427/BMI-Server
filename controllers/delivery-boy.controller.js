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

async function updateDeliveryBoy(req, res) {
	try {
		const { password, firstName, lastName, phone, email, pinCode } = req.body
    const deliveryBoy = req.deliveryBoy;

    const rules = {
      password: 'optional|string|min:3',
      firstName: 'optional|name',
      lastName: 'optional|name',
      phone: 'optional|regex:/^[0-9]{10}$/',
      email: 'optional|email',
      pinCode: 'optional|string|natural|size:6'
    }
    const {errors} = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}

    deliveryBoy.password = password ?? deliveryBoy.password;
    deliveryBoy.firstName = firstName ?? deliveryBoy.firstName;
    deliveryBoy.lastName = lastName ?? deliveryBoy.lastName;
    deliveryBoy.phone = phone ?? deliveryBoy.phone;
    deliveryBoy.email = email ?? deliveryBoy.email;
    deliveryBoy.pinCode = pinCode ?? deliveryBoy.pinCode;
    await deliveryBoy.save();

		return res.json({ message: 'Details updated successfully' })
	} catch (error) {
		console.error(error)
	}
}

async function putDeliveryBoyDocuments(req, res) {
	try {
		const deliveryBoy = req.deliveryBoy
		const aadharCard = req.files?.aadharCard?.[0]
		const panCard = req.files?.panCard?.[0]
		const drivingLicense = req.files?.drivingLicense?.[0]
		const photo = req.files?.photo?.[0]

		deliveryBoy.password = password ?? deliveryBoy.password
		deliveryBoy.firstName = firstName ?? deliveryBoy.firstName
		deliveryBoy.lastName = lastName ?? deliveryBoy.lastName
		deliveryBoy.phone = phone ?? deliveryBoy.phone
		deliveryBoy.email = email ?? deliveryBoy.email
		deliveryBoy.pinCode = pinCode ?? deliveryBoy.pinCode
		await deliveryBoy.save()

		return res.json({ message: 'Details updated successfully' })
	} catch (error) {
		console.error(error)
	}
}

const DeliveryBoyControllers = {
  createDeliveryBoy,
	login,
  getProfile,
  updateDeliveryBoy,
  putDeliveryBoyDocuments
}

module.exports = DeliveryBoyControllers