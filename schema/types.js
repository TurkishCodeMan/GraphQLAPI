const graphql = require("graphql");
const User = require("../models/User");
const Community = require("../models/Community");

const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tag: { type: GraphQLString },
        googleID: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        following:{
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                let res= await User.findById(parent.id);
                let array=await User.find({_id:{$in:res.following}});
                return array;
            }
        },
        followers:{
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                let res= await User.findById(parent.id);
                let array=await User.find({_id:{$in:res.followers}});
                return array;
            }
        },
        token:{type:GraphQLString}

    })
});


const CommunityType=new GraphQLObjectType({
    name:"Community",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:new GraphQLNonNull(GraphQLString)},
        location:{type:GraphQLString},
        description:{type:GraphQLString},
        type:{type:GraphQLBoolean},
        privating:{type:GraphQLString},
        imageUrl:{type:GraphQLString},
        category:{type:GraphQLID},
        organizators:{
            type:new GraphQLList(UserType),
            async resolve(parent,args){
                let community=await Community.findById(parent.id);
                let array=await User.find({_id:{$in:community.organizators}});
                return array;
            }
        },
        members:{
            type:new GraphQLList(UserType),
            async resolve(parent,args){
                let community=await Community.findById(parent.id);
                let array=await User.find({_id:{$in:community.members}});
                return array;
            }
        },
        activities:{
            type:new GraphQLList(UserType),
            async resolve(parent,args){
                    return new Array(2);
            }
        },
     
        // comments:{
        //     type:new GraphQLList()
        // }
    }),

});

const FileType=new GraphQLObjectType({
    name:"FileType",
    fields:()=>({
        filename: {type:GraphQLString},
        mimeType: {type:GraphQLString},
        encoding: {type:GraphQLString}
    })
});



module.exports = {
    UserType,
    CommunityType,
    FileType
}