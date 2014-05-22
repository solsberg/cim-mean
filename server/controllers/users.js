var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getUsers = function(req, res){
  User.find({}).exec(function(err, collection){
    res.send(collection);
  });
}

exports.createUser = function(req, res){
  var userData = req.body;
  userData.userName = userData.userName.toLowerCase();
  userData.salt = encryption.createSalt();
  userData.hashed_password = encryption.hashPassword(userData.salt, userData.password);
  User.create(userData, function(err, user){
    if (err){
      if (err.toString().indexOf('E11000') >= 0){
        err = new Error('Duplicate user name');
      }
      res.status(400);
      return res.send({reason: err.toString()});
    }
    res.send(user);
  });
}