const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dashboardRoutes = require('./routes/dashboard');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/dashboard', dashboardRoutes);

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() =>
        app.listen(process.env.PORT || 5000, () => {
            console.log('Connected to the server!');
        })
    );
