angular.module('cimApp').controller('instancesListCtrl', function($scope, $routeParams, Instance, DisplayInstance, identity, $http){
  $scope.userName = $routeParams.targetUserName;
  $scope.isAdmin = identity.isAdmin();

  var query_params = {};
  if (!!$routeParams.targetUserName)
    query_params.targetUserName = $routeParams.targetUserName;
  Instance.query(query_params).$promise.then(function(instances){
    $scope.instances = instances.map(function(instance){
      return new DisplayInstance(instance);
    });
  });

  $scope.start = function(instance){
    $http.post("/api" + instance.url + "/start");
  };

  $scope.stop = function(instance){
    $http.post("/api" + instance.url + "/stop");
  };
});