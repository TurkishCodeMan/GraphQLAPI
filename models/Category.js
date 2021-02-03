const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please enter a name'] },
});

module.exports = mongoose.model('Category', categorySchema);
