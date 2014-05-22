angular.module('cimApp').factory('DisplayInstance', function(){
  var DisplayInstance = function(instance){
    angular.extend(this, instance);
    this.url = "/instances/" + this._id;
  };

  DisplayInstance.prototype = {
    displayStatus: function(){
      var display_status = this.status;
      if (display_status == "running" && !this.isAvailable)
        display_status = "starting";
      if (display_status == "invalid")
        display_status = "error";
      return display_status.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },

    isStopped: function(){
      return this.status == "stopped";
    },

    isRunning: function(){
      return this.status == "running";
    },

    currentMonthHours: function(){
      return 0;
    }
  };

  return DisplayInstance;
});
