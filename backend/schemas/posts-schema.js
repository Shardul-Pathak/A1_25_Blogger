const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    created: {
      type: Date,
      default: Date.now
    },
    cat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories'
    },
    auth_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authors'
    }
});

module.exports = mongoose.model('Posts', postSchema);
