const graphql = require("graphql");

const {GraphQLObjectType}=graphql;


const QueryUser=require("../resolvers/User/query");
const MutationUser=require("../resolvers/User/Mutation");

const QueryCommunity=require("../resolvers/community/Query");
const MutationCommunity=require("../resolvers/community/Mutation");


//User
const UserQuery=new GraphQLObjectType({
    name:"UserQuery",
    fields:QueryUser //All User Query İşlemleri
  
});
const UserMutation=new GraphQLObjectType({
    name:"UserMutation",
    fields:MutationUser
});


//Community
const CommunityQuery=new GraphQLObjectType({
    name:"CommunityQuery",
    fields:QueryCommunity
});

const CommunityMutation=new GraphQLObjectType({
    name:"MutationQuery",
    fields:MutationCommunity,
})

module.exports={
    UserQuery,
    UserMutation,
    CommunityQuery,
    CommunityMutation
}