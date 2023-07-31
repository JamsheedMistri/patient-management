const express = require('express');
const Patient = require('../models/patient');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
	const patients = await Patient.find();
	res.json(patients);
});

router.post('/', authMiddleware, async (req, res) => {
	const patient = new Patient(req.body);
	const savedPatient = await patient.save();
	res.json(savedPatient);
});

router.get('/:id', authMiddleware, async (req, res) => {
	const patient = await Patient.findById(req.params.id);
	res.json(patient);
});

router.put('/:id', authMiddleware, async (req, res) => {
	const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.json(patient);
});

router.delete('/:id', authMiddleware, async (req, res) => {
	const result = await Patient.findByIdAndDelete(req.params.id);
	res.json(result);
});

module.exports = router;
