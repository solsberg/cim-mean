var AWS = require('aws-sdk');

module.exports = function(config){
  AWS.config.loadFromPath(config.rootPath + '/server/config/aws-credentials.json');
};