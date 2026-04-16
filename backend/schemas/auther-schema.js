const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,  
  status: String,
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Authors', authorSchema);  