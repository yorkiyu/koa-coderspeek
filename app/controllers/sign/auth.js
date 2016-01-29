var passport = require("koa-passport");
var config = require("../../../config.js");

var GithubStrategy = require('passport-github').Strategy; 
var LocalStrategy = require('passport-local').Strategy;

var user = { id: 1, username: 'test' }

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

//local
passport.use(new LocalStrategy(function(username, password, done) {
  // retrieve user ...
  if (username === 'test' && password === 'test') {
    done(null, user);
  } else {
    done(null, false);
  }
}));

//github
passport.use(new GithubStrategy (config.github,
    function(token,tokenSecret,profile,done){
        done(null,user);
    }
));
