angular.module('cimApp').factory('CachedUser', function(User){
  var userList;

  return {
    query: function(){
      if (!userList){
        userList = User.query();
      }
      return userList;
    },

    reload: function(){
      userList = undefined;
    }
  };
});
