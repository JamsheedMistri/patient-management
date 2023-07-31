const express = require('express');
const Config = require('../models/config');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
	const config = await Config.findOne();
	res.json(config ? config.additionalFields : []);
});

router.post('/', authMiddleware, async (req, res) => {
	await Config.deleteMany({});
	const newConfig = new Config({ additionalFields: req.body });
	const savedConfig = await newConfig.save();
	res.json(savedConfig);
});

module.exports = router;
