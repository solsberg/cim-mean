angular.module('cimApp').factory('cimAuth', function($q, $http, identity){
  return {
    isLoggedIn: function(){
      if (identity.isAuthenticated())
        return true;
      else
        return $q.reject('not logged in');
    },
    isAdmin: function(){
      if (!identity.isAuthenticated())
        return $q.reject('not logged in');
      else if (identity.currentUser.admin)
        return true;
      else
        return $q.reject('not authorized');
    },
    authenticateUser: function(userName, password){
      var dfd = $q.defer();
      $http.post('/login', {userName: userName, password: password}).then(function(response){
        if (response.data.success){
          identity.currentUser = response.data.user;
          dfd.resolve(true);
        }
        else
          dfd.resolve(false);
      });
      return dfd.promise;
    },
    logoutUser: function(){
      var dfd = $q.defer();
      $http.post('/logout', {logout: true})
        .then(function(){
          identity.currentUser = undefined;
          dfd.resolve(false);
        });
      return dfd.promise;
    }
  };
});