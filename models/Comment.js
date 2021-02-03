const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userID:{type:mongoose.Schema.Types.ObjectId},
  content:{type:String}
});

module.exports = mongoose.model('Comment', commentSchema);
