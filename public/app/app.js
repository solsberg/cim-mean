angular.module('cimApp', ['ngResource', 'ngRoute']);

angular.module('cimApp').config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main'});
});