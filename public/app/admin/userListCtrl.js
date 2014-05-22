angular.module('cimApp').controller('userListCtrl', function($scope, CachedUser){
  $scope.users = CachedUser.query();
});
