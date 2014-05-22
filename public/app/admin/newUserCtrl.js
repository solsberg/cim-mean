angular.module('cimApp').controller('newUserCtrl', function($scope, User, CachedUser, $location){
  var setError = function(msg){
    $scope.validation_summary_errors = msg;
  }
  setError('');

  $scope.createUser = function(){
    var user = new User({
      userName: $scope.userName,
      email: $scope.email,
      password: $scope.password,
      admin: $scope.admin
    });

    if ($scope.password != $scope.passwordConfirm){
      setError("The password and confirmation do not match.");
      return;
    }

    user.$save().then(function(){
      CachedUser.reload();
      $location.path('/admin/users');
    }, function(response){
      setError(response.data.reason);
    });
  }
});