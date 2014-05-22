angular.module('cimApp').factory('Instance', function($resource){
  var InstanceResource = $resource('/api/instances/:_id', {
    _id: "@id"
  },{
    update: {method: 'PUT', isArray: false}
  });

  return InstanceResource;
});
