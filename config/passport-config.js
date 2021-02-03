const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

const passportJs = async (passport) => {
  passport.use(new GoogleStrategy({
    clientID: '789002304968-g3nim07om0fiv04hpq6n0qa0jrpoaajc.apps.googleusercontent.com',
    clientSecret: 'cPOxnO9FoW8TG396selUQHGa',
    callbackURL: '/api/auth/redirect',
    //   passReqToCallback: true
  },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
 
          return done(err, user);
        }

       
        new User({
          name: profile.displayName,
          googleID: profile.id,
          imageUrl: profile._json.picture,
        }).save()
          .then((newUser) => done(err, newUser))
          .catch((err) => done(err, false));
      });
    }));

  passport.serializeUser((user, done) => {
    console.log("Serialize")

    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserialize")
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};


module.exports = passportJs;
