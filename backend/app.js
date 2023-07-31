require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const patientRoutes = require('./routes/patients');
const authRoutes = require('./routes/auth');
const configRoutes = require('./routes/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use('/patients', patientRoutes);
app.use('/auth', authRoutes);
app.use('/config', configRoutes);

app.listen(process.env.PORT || proceess.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`);
});
