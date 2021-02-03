const graphql = require("graphql");

const { GraphQLSchema } = graphql;
const { UserQuery,
    UserMutation,
    CommunityMutation,
    CommunityQuery } = require("./query_mutation/Query_Mutation")

const { stitchSchemas } = require('@graphql-tools/stitch');


//All User CRUD
const UserSchema = new GraphQLSchema({
    query: UserQuery,
    mutation: UserMutation
});

const CommunitySchema = new GraphQLSchema({
    query: CommunityQuery,
    mutation: CommunityMutation,

});


//All Schema Merge
const schemass = stitchSchemas({
    subschemas: [
        UserSchema,
        CommunitySchema
    ]
});

module.exports = schemass
