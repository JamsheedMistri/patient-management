const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
	additionalFields: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Config', ConfigSchema);
