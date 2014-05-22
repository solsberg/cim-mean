angular.module('cimApp').factory('User', function($resource){
  var UserResource = $resource('/api/users/:_id', {_id: "@id"},{
    update: {method: 'PUT', isArray: false}
  });

  return UserResource;
});
