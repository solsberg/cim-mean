var Instance = require('mongoose').model('Instance'),
    ec2 = require('../services/ec2'),
    usageCalculator = require('../services/usageCalculator'),
    Q = require('q');

exports.addInstance = function(req, res){
  var instanceData = req.body;

  Instance.findOne({name: instanceData.name, dropped: false}).exec(function(err, instance){
    if (err){
      res.status(400);
      return res.send({reason: err.toString()});
    }
    if (instance != null){
      res.status(400);
      return res.send({reason: 'already assigned', name: instance.user});
    }

    ec2.verifyInstance(instanceData.name).then(function(found){
      if (!found){
        res.status(400);
        return res.send({reason: 'invalid instance'});
      }
      // instance.lastNotifyTime = DateTime.UtcNow; SMO
      instanceData.dropped = false;
      Instance.create(instanceData, function(err, instance){
        if (err){
          res.status(400);
          return res.send({reason: err.toString()});
        }
        res.send(instance);
      });
    }, function(reason){
      res.status(400);
      res.send({reason: reason});
    });
  });
};

exports.getInstances = function(req, res){
  var userName = req.query.targetUserName || req.user.userName;
  Instance.find({user: userName, dropped: false}).exec(function(err, collection){
    ec2.updateStatusOfInstances(collection).then(function(updated_instances){
      // foreach (var instance in instances)
      // {
      //     if (instance.Status == InstanceStatus.Running)
      //     {
      //         if (!instance.IsAvailable)
      //             instance.IsAvailable = ec2Service.IsInstanceReachable(instance.Name);
      //     }
      //     else
      //     {
      //         instance.IsAvailable = false;
      //     }
      // }
      updated_instances.forEach(function(instance){
        instance.save(function(err){
          //TO DO
        });
      });

      Q.all(updated_instances.map(function(instance){
        return usageCalculator.getCurrentUptime(instance);
      })).then(function(uptimes){
        updated_instances = updated_instances.map(function(instance, idx){
          instance = instance.toObject();
          instance.currentUptime = uptimes[idx];
          return instance;
        });
        res.send(updated_instances);
      });
    }, function(reason){
      res.status(400);
      res.send({reason: reason});
    });
  });
};

exports.startInstance = function(req, res){
  Instance.findById(req.params.id).exec(function(err, instance){
    if (err || 
        instance.dropped || 
        (instance.user != req.user.userName && !req.user.admin)){
      res.status(400);
    res.send({reason: 'invalid instance'});
    }

    if (instance.status != "stopped"){
      res.send({success: true});
      return;
    }

    ec2.startInstance(instance).then(function(){
      // instanceRepository.RecordInstanceAction(instanceToStart, ActionType.Start);
      // ResetNotifyTime(instanceToStart);
      res.send({success:true});
    }, function(reason){
      res.status(400);
      res.send({reason: reason});
    });
  });
}

exports.stopInstance = function(req, res){
  Instance.findById(req.params.id).exec(function(err, instance){
    if (err || 
        instance.dropped || 
        (instance.user != req.user.userName && !req.user.admin)){
      res.status(400);
    res.send({reason: 'invalid instance'});
    }

    if (instance.status != "running" && instance.status != "starting"){
      res.send({success: true});
      return;
    }

    // instanceRepository.RecordInstanceAction(instanceToStop, ActionType.Stop);
    ec2.stopInstance(instance).then(function(){
      res.send({success:true});
    }, function(reason){
      res.status(400);
      res.send({reason: reason});
    });
  });
}