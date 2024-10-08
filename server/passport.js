const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();

passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            callbackURL : "https://full-stack-server-two.vercel.app/google/callback",
            scope : ['profile', 'email'],
        },
        function (accessToken, refreshToken, profile, done){
            done(null, profile);
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})
