const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(new GoogleStrategy(
    {
      clientID:
        "6904801624-79af0pf3990ddoi6o7en3ieh4sik4g3c.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});