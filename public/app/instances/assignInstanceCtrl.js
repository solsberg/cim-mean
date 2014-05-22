angular.module('cimApp').controller('assignInstanceCtrl', function($scope, $routeParams, Instance, $location, identity){
  var userName = $routeParams.userName;
  $scope.userName = userName;
  if (identity.isAdmin())
    $scope.cancelQueryString = '?targetUserName=' + userName;

  var setError = function(msg){
    $scope.validation_summary_errors = msg;
  }
  setError('');

  $scope.assignInstance = function(){
    var instance = new Instance({
      name: $scope.name,
      user: userName,
      loginName: $scope.loginName,
      loginPassword: $scope.loginPassword
    });

    instance.$save().then(function(){
      // CachedUser.reload();
      var params = {};
      if (identity.isAdmin())
        params.targetUserName = userName;
      $location.path('/instances').search(params);
    }, function(response){
      var err = response.data.reason;
      if (err === 'already assigned')
        err = 'That instance is already assigned to ' + response.data.user;
      else if (err === 'invalid instance')
        err = 'No instance could be found with the Id ' + instance.name;
      setError(err);
    });
  };
});