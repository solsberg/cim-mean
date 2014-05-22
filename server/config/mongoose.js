var mongoose = require('mongoose'),
    User = require('../models/user'),
    Instance = require('../models/instance');

module.exports = function(){
  mongoose.connect('mongodb://localhost/cim');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function(){
    console.log('cim db opened');
  });

  User.createDefaultUsers();
}