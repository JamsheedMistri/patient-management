const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
	firstName: String,
	middleName: String,
	lastName: String,
	dob: String,
	status: String,
	addresses: [String],
	additionalFields: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Patient', PatientSchema);
