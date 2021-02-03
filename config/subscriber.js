const redis = require("redis");
const client = redis.createClient();
const Event = require("../models/Event")
client.on("error", (err) => {
    if (err) return console.log(err);
})

client.on('connect', function () {
    console.log('Redis Subscriber Bağlandı');
});


module.exports = async (channel) => {
    client.on("message", async (channel, message) => {
        try {
            let msg = JSON.parse(message)
       
            console.log("SUBSCRİBER ALDI")
            let event = new Event({
                userID: msg.user ? msg.user._id : "5ff5cf8fdba016348432b26e",
                eventObject: msg.eventObject,
                eventType: msg.eventType
            });

            await event.save();
        } catch (error) {
            return error;
        }
    })
    client.subscribe(channel)
}
