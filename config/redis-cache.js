const redis =require("async-redis");
const redisCache = redis.createClient();
redisCache.on("error", (err) => {
    if (err) return console.log(err);
})

redisCache.on('connect', function () {
    console.log('Redis Cache için bağlandı');
});

module.exports=redisCache;