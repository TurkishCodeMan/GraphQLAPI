const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/kommunity', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected Database');
}
module.exports = connectDB;
