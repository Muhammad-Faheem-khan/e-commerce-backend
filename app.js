require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./config/connectDB.js')

const routes = require('./routes')

const app = express()

require('./controllers/orders.js');
const cors = require('cors'); 

app.use(express.json())
app.use(cors());
app.use('/api', routes)

connectToMongoDB();

module.exports = app