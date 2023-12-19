const mongoose = require('mongoose')

const DeliveryBoySchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: String,
		lastName: String,
		phone: String,
		email: String,
		pinCode: String,
		aadharCard: String,
		panCard: String,
		drivingLicense: String,
    photo: String,
	},
	{ timestamps: true, versionKey: false }
)

const DeliveryBoy = mongoose.model('DeliveryBoy', DeliveryBoySchema, 'delivery_boys')

module.exports = DeliveryBoy
