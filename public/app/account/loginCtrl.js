angular.module('cimApp').controller('loginCtrl', function($scope, cimAuth, $location, identity){
  $scope.identity = identity;

  var setError = function(msg){
    $scope.validation_summary_errors = msg;
  }
  setError('');

  $scope.signin = function(userName, password){
    cimAuth.authenticateUser(userName, password).then(function(success){
      if (success)
        $location.path('/');
      else
        setError("The user name or password provided is incorrect.")
    }, function(){
        setError("The user name or password provided is incorrect.xxxx")
    });
  };
});