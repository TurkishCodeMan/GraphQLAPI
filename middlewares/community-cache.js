const { GraphQLList } = require("graphql");
const redisCache = require("../config/redis-cache");
const { CommunityType } = require("../schema/types");

const communityCache = resolver => async (parent, args, context, info, res) => {
    //Buradaki mantıkta ilk bu fonksiyon çalışacak sonra şartlar sağlanırsa resolver çalışır
    // context.redisCache.set("a","denemeee");
    try {
        var communityList = [];
        var keysLength;
        if (redisCache.connected) {

            let keys = await redisCache.keys("Community*");
            if (keys.length > 0) {
                console.log("---ff " + keys.length);
                keysLength = keys.length;
                for (let i = 0; i < keys.length; i++) {

                    let community = await redisCache.get(keys[i]);
                    communityList.push(JSON.parse(community));

                    //En önemli yer
                    if (communityList.length == keysLength) {
                        console.log(communityList.length + "--cache");
                        return communityList;
                    }

                }

            }
            else {
                return resolver(parent, args, context)
            }

        }


    } catch (error) {
        return error;
    }

}

module.exports = { communityCache }