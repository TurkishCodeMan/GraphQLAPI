const graphql = require("graphql");
const { authControl } = require("../../../middlewares/authControl");
const Community = require("../../../models/Community");
const { GraphQLList } = graphql;
const { CommunityType } = require("../../types");
const { communityCache } = require("../../../middlewares/community-cache")
const redisCache = require("../../../config/redis-cache");

const QueryResolver = {
    allCommunities: {
        type: new GraphQLList(CommunityType),
        resolve: communityCache(async (parent, args, context) => {
            try {
                let communities = await Community.find();
                let communityID;
                console.log(communities.length)

                communities.forEach(async community => {
                    communityID = 'Community:' + community._id;
                    var data = JSON.stringify(community);
                    await redisCache.set(communityID, data);
                });

                console.log("end");

                return communities;
            } catch (error) {
                return error;
            }
        })
    },

    getCommunityById: {
        type: CommunityType,
        args: {
            id: { type: graphql.GraphQLID }
        },
        resolve: async (parent, args, context) => {
            try {
                let community = await Community.findById(args.id);
                return community;
            } catch (error) {
                return error;
            }

        }
    },
    getMyCommunity: {
        type: new GraphQLList(CommunityType),
        resolve: authControl(async (parent, args, context) => {
            try {
                return await Community.find({ "members": { $in: [context.user._id] } })
            } catch (error) {
                return error;
            }
        })
    },


}

module.exports = QueryResolver;