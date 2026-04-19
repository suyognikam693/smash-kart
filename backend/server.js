require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like uploaded screenshots) mapping /uploads to the local folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/events', eventRoutes);
app.use('/api/register', registrationRoutes);
app.use('/api/users', userRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Kart Smasher Backend API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
