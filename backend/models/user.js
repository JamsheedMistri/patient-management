const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
	const user = this;
	if (this.isModified('password') || this.isNew) {
		const hash = await bcrypt.hash(user.password, 10);
		user.password = hash;
	}
	next();
});

UserSchema.methods.comparePassword = function (password, callback) {
	bcrypt.compare(password, this.password, callback);
};

module.exports = mongoose.model('User', UserSchema);
