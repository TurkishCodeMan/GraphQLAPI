const Community = require("../../../models/Community");
const graphql = require("graphql");
const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt } = graphql;

const { CommunityType, FileType } = require("../../types");
const { authControl } = require("../../../middlewares/authControl")
const User = require("../../../models/User");
const publish=require("../../../config/publisher");

const MutationResolver = {
    addCommunity: {
        type: CommunityType,
        args: {
            name: { type: GraphQLString },
            location: { type: GraphQLString },
            description: { type: GraphQLString },
            privating: { type: GraphQLString },
            category: { type: GraphQLID },
            //imageUrl: req.file.filename,
            //image:{type:FileType}
        },


        //AuthControl
        resolve: authControl(async (parent, args, context) => {
            try {
                let community = new Community({
                    name: args.name,
                    location: args.location,
                    description: args.description,
                    privating: args.private,
                    category: args.category,
                    // imageUrl: req.file.filename,
                })

                await community.save();
                community.organizators.push("5ffae07a7fdcb114b4e3f9fc")
                community.members.push("5ffae07a7fdcb114b4e3f9fc");
                await community.save();

                const userr = await User.findOne({ _id: "5ffae07a7fdcb114b4e3f9fc" });

                userr.members.push(community._id);
                userr.save();
                publish("events",context.user,"createCommunity",community);
                return community;
            } catch (error) {
                return error;
            }

        })
    },
    subscribeCommunity: {
        type: CommunityType,
        args: {
            id: { type: GraphQLID },
        },
        resolve: authControl(async (parent, args, context) => {
            try {
                const community = await Community.findById(args.id);
                community.members.push(context.user._id);
                await community.save();

                const user = await User.findById(context.user._id);
                user.members.push(community._id);
                console.log(user.members);
                await user.save();
                return community;
            } catch (error) {
                return error;
            }
        })
    },
    unSubscribeCommunity: {
        type: CommunityType,
        args: {
            id: { type: GraphQLID },
        },
        resolve: authControl(async (parent, args, context) => {
            try {
                const community = await Community.findById(args.id);
                community.members.splice(community.members.findIndex(p => p._id == context.user._id), 1);
                await community.save();
                const user = await User.findById(context.user._id);
                user.members.splice(user.members.findIndex(p => p._id == parent._id), 1);
                await user.save();
                return community;
            } catch (error) {
                return error;
            }
        })
    },
    deleteCommunity: {
        type: CommunityType,
        args: {
            id: { type: graphql.GraphQLID }
        },
        resolve: async (parent, args, context) => {
            try {
                return await Community.findByIdAndDelete(args.id);
            } catch (error) {
                return error;
            }
        }
    }

}

module.exports = MutationResolver