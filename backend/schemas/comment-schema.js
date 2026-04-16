const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String,
  subject: String,
  status: String,
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comments', commentSchema);