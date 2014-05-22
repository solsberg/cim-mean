angular.module('cimApp', ['ngResource', 'ngRoute']);

angular.module('cimApp').config(function($routeProvider, $locationProvider){

  var routeRoleChecks = {
    authenticatedUser: {
      auth: function(cimAuth){
        return cimAuth.isLoggedIn();
      }
    },
    admin: {
      auth: function(cimAuth){
        return cimAuth.isAdmin();
      }
    }
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {redirectTo: '/instances'})
    .when('/instances', { templateUrl: '/partials/instances/index', controller: 'instancesListCtrl', resolve: routeRoleChecks.authenticatedUser})
    .when('/instances/new', {templateUrl: '/partials/instances/assign', controller: 'assignInstanceCtrl', resolve: routeRoleChecks.admin})
    .when('/admin/users', {templateUrl: '/partials/admin/users', controller: 'userListCtrl', resolve: routeRoleChecks.admin})
    .when('/admin/users/new', {templateUrl: '/partials/admin/new-user', controller: 'newUserCtrl', resolve: routeRoleChecks.admin})
    .when('/login', { templateUrl: '/partials/account/login', controller: 'loginCtrl'});
});

angular.module('cimApp').run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
    if (rejection === 'not logged in')
      $location.path('/login');
    else if (rejection === 'not authorized')
      $location.path('/');
  });
});