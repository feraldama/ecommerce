const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy } = require("passport-local");
const encrypt = require("../encrypt.js");
const { User } = require("../db.js");
const { GOOGLE_ID, GOOGLE_SECRET } = process.env;

passport.use(
  new Strategy(function (username, password, done) {
    User.findOne({ where: { email: username } })
      .then((user) => {
        if (!user) return done(null, false);
        else if (user.password == encrypt(password)) {
          return done(null, user);
        } else return done(null, false);
      })
      .catch((err) => done(err));
  })
);

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ where: { googleID: profile.id } })
      .then(user => {
        if(!user) {
          User.findOne({ where: { email: profile.emails[0].value }})
            .then(user => {
              if(!user) {
                console.log('Registrando nuevo usuario');
                User.create({
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  password: encrypt(profile.id + GOOGLE_SECRET),
                  email: profile.emails[0].value,
                  googleID: profile.id
                })
                  .then(newUser => {
                    return done(null, newUser);
                  })
                  .catch(err => done(err));
              }
              else {
                console.log('Vinculando usuario existente con cuenta Google');
                user.googleID = profile.id;
                user.save();
                done(null, user);
              }
            })
            .catch(err => done(err));
        }
        else {
          done(null, user);
        }
      })
      .catch(err => done(err));
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
