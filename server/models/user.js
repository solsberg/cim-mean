var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  userName: {type: String, required: "{PATH} is required", unique: true},
  email: {type: String, required: "{PATH} is required"},
  salt: {type: String, required: "{PATH} is required"},
  hashed_password: {type: String, required: "{PATH} is required"},
  admin: Boolean
});
userSchema.methods = {
  authenticate: function(passwordToMatch){
    return encryption.hashPassword(this.salt, passwordToMatch) == this.hashed_password;
  }
};
var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function(){
  User.find({}).exec(function(err, collection){
    if (collection.length == 0){
      var salt;
      salt = encryption.createSalt();
      User.create({userName: "solsberg", email: "simon@caliper.com", admin: true, 
        salt: salt, hashed_password: encryption.hashPassword(salt, "simon")});
    }
  });
};
