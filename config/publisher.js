const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => {
    if (err) return console.log(err);
})

client.on('connect', function () {
    console.log('Redis Publisher Bağlandı');
});

module.exports = (channel,user,eventType, data) => {
    let sendingData={
        eventObject:data._doc,
        eventType,
        user
    }

    client.publish(channel, JSON.stringify(sendingData), (err, reply) => {
        if (err) return console.log(err);
        console.log("Message " + reply + " kişiye gönderildi")
    })
}