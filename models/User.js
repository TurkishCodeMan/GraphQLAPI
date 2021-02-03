const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const userSchema = mongoose.Schema({
  name: { type: String, },
  uuid: { default: uuid(), type: String },
  tag: { type: String },
  googleID: { type: String },
  imageUrl: { type: String },
  email:{type:String},
  password:{type:String},
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }

  ]
});

userSchema.methods.followingUser = async function (followingUserID) {

  let index = this.following.findIndex(item => {
    return item.toString() === followingUserID.toString();
  })

  if (index >= 0) {
    return 'Zaten Takip Ettikleriniz Arasında'
  } else {
    this.following.push(followingUserID);
    return this.save();
  }

}
userSchema.methods.unFollowingUser = async function (unFollowingUserID) {
  let array = this.following.filter(item => {
    return item.toString() !== unFollowingUserID.toString();
  })
  this.following = array;
  return this.save();

}
const User = mongoose.model('User', userSchema);

module.exports = User;
