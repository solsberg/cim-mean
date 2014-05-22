var Q = require('q');

exports.getCurrentUptime = function(instance){
  var dfd = Q.defer();
  dfd.resolve(30);
  return dfd.promise;
};