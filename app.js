const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config.env" });
const { graphqlHTTP } = require("express-graphql");

const cors = require("cors")
const expressSession = require("express-session")
const schema = require("./schema/schema")

const bodyParser = require("body-parser");
const redisCache = require("./config/redis-cache");
var redisStore = require('connect-redis')(expressSession);

const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

app.use(cors());

require("./config/subscriber")("events");//Events Kanalına Subscriber Oluyoruz Dinlemeye Başlıyoruz
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const jsonwebtoken = require('jsonwebtoken');


function getUser(token) {


    let user = jsonwebtoken.verify(token, "mysecret");
    console.log(user);
    return user;


}
//Middleware Burada Olursa Tüm Rotaları Denetler
const auth = jwt({
    secret: "mysecret",
    credentialsRequired: false,
    algorithms: ['RS256']
})

app.use('/graphql', auth, graphqlHTTP((req, res, next) => ({
    schema,
    graphiql: true,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.token || '';
        console.log(req.headers)
        // try to retrieve a user with the token
        const user = getUser(token);

        // optionally block the user
        // we could also check user roles/permissions here
        if (!user) throw new AuthenticationError('you must be logged in');

        // add the user to the context
        return { user };
    },

})));



require("./config/db")();

app.listen(3000, (err) => {
    if (err) {
        throw err;
    }
    console.log("Listening on port " + process.env.PORT)
})