const mongoose = require('mongoose');
const Event = require("./Event")
const communitySchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please enter a name'] },
  location: { type: String }, // İlerde mapquest ile location alınabilir ve harita ile gösterilebilir ! pre ile
  organizators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  description: { type: String },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
    },
  ],
  type: { type: Boolean, default: false },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  privating: { type: String, },
  imageUrl:{type:String}
});

//Community Eventss
communitySchema.methods.getAllEvents = async function () {
  try {
    let communityEvents = await Event.find({ eventType: { $in: ['subscribeCommunity', 'unSubscribeCommunity'] }, 'eventObject._id': `${this._id}` }).populate({
      path: 'userID',
      select: 'name imageUrl', model: 'User'
    });

    return communityEvents;

  } catch (error) {
    return error.message;
  }
}


module.exports = mongoose.model('Community', communitySchema);
