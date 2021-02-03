const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  location: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  endTime: { type: Date, default: (Date.now()+1) },
  happened: { type: Boolean, default: false },
  // expireAt:{
  //   type:Date,
  //   index:{expires:this.endTime}
  // }

});

module.exports = mongoose.model('Activity', activitySchema);
