var passport = require("koa-passport");
var config = require("../../config.js");
var github = require("../controllers/sign/github");
var co = require("co");
var GithubStrategy = require('passport-github').Strategy; 
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
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
    function(accessToken,refreshToken,profile,done){
		co(github.findOrCreate,accessToken,refreshToken,profile)
		.then(function(user){
			done(null,user);
		},function(err){
			done(null,err);
		});
    }
));
