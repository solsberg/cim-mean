angular.module('cimApp').factory('identity', function(){
  var currentUser;
  if (!!window.bootstrappedUserObject)
    currentUser = window.bootstrappedUserObject;
  return {
    currentUser: currentUser,
    isAuthenticated: function(){
      return !!this.currentUser;
    },
    isAdmin: function(){
      return this.isAuthenticated() && this.currentUser.admin;
    }
  };
});