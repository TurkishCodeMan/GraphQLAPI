const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    eventObject: { type: Object },
    eventType:{type:String},
    createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("Event", eventSchema);