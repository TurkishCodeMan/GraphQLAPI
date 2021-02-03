const User = require("../../../models/User");
const graphql = require("graphql");
const { GraphQLList } = graphql;
const { UserType } = require("../../types");
const passport = require("passport");


//All User DB/Other Source
const QueryResolver = {
    me: {
        type: UserType,
        resolve: async (parent, args, context,info) => {
            try {
                console.log("mede")
              console.log(context.user);
              return context.user
            } catch (error) {
                return error;
            }
        }
    },
    allUser: {
        type: new GraphQLList(UserType),
        async resolve(parent, args,context,info) {
            try {
                return await User.find();
            } catch (error) {
                return error;
            }
        }
    },
    getUser: {
        type: UserType,
        args: {
            id: { type: graphql.GraphQLID },
        },
        async resolve(parent, args) {
            try {
                return await User.findById(args.id);
            } catch (error) {
                return error;
            }
        }
    },
}
module.exports = QueryResolver

