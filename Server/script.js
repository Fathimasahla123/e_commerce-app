const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
    origin: "https://e-commerce-app-nu-sage.vercel.app/",
    credentials: true
  }))


// Routes
app.use('/api/products', require('./src/routes/productRoutes'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));