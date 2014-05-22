var AWS = require('aws-sdk'),
    Q = require('q');

var getClient = function(){
  return new AWS.EC2();
}

var instanceStatusFromStateCode = function(instanceState){
  switch(instanceState.Code)
  {
      case 0:  return "starting";    //pending
      case 16: return "running";
      case 64: return "stopping";
      case 80: return "stopped";

      default: return "invalid";
  }
}

exports.verifyInstance = function(instanceId){
  var deferred = Q.defer();

  getClient().describeInstances({
    InstanceIds: [instanceId]
  }, function(err, data){
    if (err)
      deferred.reject(err.toString());
    else{
      deferred.resolve(data.Reservations.length > 0 && data.Reservations[0].Instances.length > 0);
    }
  });

  return deferred.promise;
};

exports.updateStatusOfInstances = function(instances){
  var deferred = Q.defer();

  getClient().describeInstances({
    InstanceIds: instances.map(function(instance){
      return instance.name;
    })
  }, function(err, data){
    if (err)
      deferred.reject(err.toString());
    else{
      data.Reservations.forEach(function(reservation){
        reservation.Instances.forEach(function(running_instance){
          var i;

          for (i = 0; i < instances.length; i++){
            if (instances[i].name === running_instance.InstanceId){
              instances[i].status = instanceStatusFromStateCode(running_instance.State);
              if (instances[i].status == "running" ||
                  instances[i].status == "starting")
                  instances[i].ipAddress = running_instance.PublicIpAddress;
              else
                  instances[i].ipAddress = "";
              break;
            }
          }
        });
      });

      deferred.resolve(instances);
    }
  });

  return deferred.promise;
};

exports.startInstance = function(instance){
  var deferred = Q.defer();

  getClient().startInstances({
    InstanceIds: [instance.name]
  }, function(err, data){
    if (err)
      deferred.reject(err.toString());
    else{
      deferred.resolve(true);
    }
  });

  return deferred.promise;
};

exports.stopInstance = function(instance){
  var deferred = Q.defer();

  getClient().stopInstances({
    InstanceIds: [instance.name]
  }, function(err, data){
    if (err)
      deferred.reject(err.toString());
    else{
      deferred.resolve(true);
    }
  });

  return deferred.promise;
};