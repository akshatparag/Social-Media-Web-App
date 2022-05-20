const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"637407858554-460h38sdfe1c5m3vepnmprbu487am1ga.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('Error in Google Strategy',err);
                return;
            }
            console.log(accessToken,refreshToken);
            console.log(profile);

            if(user){
                //if found,set ths user as req.user
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport',err);return;}
                        
                    return done(null,user);
                });
            }
        });
    }
));

module.exports = passport;