angular.module('cimApp').controller('navbarCtrl', function($scope, cimAuth, $location, identity){
  $scope.identity = identity;
  
  $scope.signout = function(){
    cimAuth.logoutUser().then(function(){
      $location.path('/login');
    });
  };
});