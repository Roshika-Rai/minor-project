const express = require('express');
const mongoose = require('mongoose');

const itineraryRouter = require('./routers/ItineraryRouter');
const UserRouter = require('./routers/UserRouter');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000']
}))
app.use(express.json());
// Routers
app.use('/itinerary',itineraryRouter);
app.use('/user', UserRouter);

// MongoDB connect
mongoose.connect('mongodb+srv://rairoshika201:1234@cluster0.m1ixonc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Routes
app.use('/user', UserRouter);
app.use('/itineraries', itineraryRouter);

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));