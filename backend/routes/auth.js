const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
	const { email, password } = req.body;
	const user = new User({ email, password });

	try {
		const savedUser = await user.save();
		const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});
		res.status(201).json({ token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Email is already in use' });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user)
		return res.status(400).json({ error: 'Invalid email or password' });

	user.comparePassword(password, (err, isMatch) => {
		if (!isMatch)
			return res.status(400).json({ error: 'Invalid email or password' });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});
		res.json({ token });
	});
});

module.exports = router;
