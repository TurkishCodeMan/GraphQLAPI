const User = require("../../../models/User");
const graphql = require("graphql");
const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt } = graphql;
const { UserType } = require("../../types");

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const MutationResolver = {

    addUser: {
        type: UserType,
        resolve: async () => {
            console.log("hehe mutation")
        }
    },
    sign: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        async resolve(_, { username, email, password }) {
            const user = await User.create({
                username,
                email,
                password: password,
            })

            // return json web token
            return jsonwebtoken.sign(
                { user },
                "mysecret",
                { expiresIn: '1d' }
            )
        },

    },
    login: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        async resolve(_, { email, password }) {

            const user = await User.findOne({ email: email })

            if (!user) {
                throw new Error('No user with that email')
            }


            let token = jsonwebtoken.sign(
                { ...user._doc },
                "mysecret",
                { expiresIn: '15m' }
            )
            let userr = jsonwebtoken.verify(token, "mysecret")
            userr.token = token;

            return userr;
        

        }
    }
}



module.exports = MutationResolver