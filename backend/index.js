const express = require('express');
const helmet = require('helmet')
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')
const cors = require('cors')
const morgan = require('morgan')
// connect to database
connectDB()

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Routes
app.use('/api/',morgan('dev'),require('./routes/authRoutes'))
app.use('/api/users',morgan('dev'),require('./routes/userRoutes'))
app.use('/api/airplane',morgan('dev'),require('./routes/airplaneRoutes'))
app.use('/api/seat',morgan('dev'),require('./routes/seatRoutes'))
app.use('/api/reservations',morgan('dev'),require('./routes/reservationRoutes'))
app.use('/api/flights',morgan('dev'),require('./routes/flightRoutes'))
//app.use('/api/payment',morgan('dev'),require('./routes/paymentRoutes'))

// Listening port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
