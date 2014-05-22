var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function(){
  passport.use(new LocalStrategy({
    usernameField: 'userName'
  }, function(userName, password, done){
    User.findOne({userName:userName}).exec(function(err, user){
      if (user && user.authenticate(password))
        return done(null, user);
      else
        return done(null, false);
    });
  }));

  passport.serializeUser(function(user, done){
    if (user)
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
      if (user)
        done(null, user);
      else
        done(null, false);
    });
  });
};
