const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: false }
});

module.exports = mongoose.model('Post', postSchema);
