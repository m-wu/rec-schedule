(function() {
  'use strict';
  
  angular.module('recApp').filter('fromNow', fromNow);
  angular.module('recApp').filter('today', today);
  angular.module('recApp').filter('tomorrow', tomorrow);
  angular.module('recApp').filter('future', future);  
  angular.module('recApp').filter('eventFilter', ['myConstant', 
  	'ignoredSwimEvents', 'ignoredGymKeywords', 'ignoredIceKeywords', eventFilter]);
  angular.module('recApp').filter('eventStartTime', eventStartTime);  

  function fromNow (){
    return function(dateString) {
      return moment(dateString).calendar()
    };
  }

  function today () {
    return function(events) {
      if (!events || !events.length) { return; }
      return events.filter(function(event) {
        var startDate = event.start.date ? event.start.date : event.start.dateTime
        return moment(startDate).isSame(moment(), 'day');
      });
    };
  }

  function tomorrow () {
    return function(events) {
      if (!events || !events.length) { return; }
      return events.filter(function(event) {
        var startDate = event.start.date ? event.start.date : event.start.dateTime
        return moment(startDate).isSame(moment().add(1, 'd'), 'day');
      });
    };
  }

  function future () {
    return function(events) {
      if (!events || !events.length) { return; }
      return events.filter(function(event) {
        var startDate = event.start.date ? event.start.date : event.start.dateTime
        return moment(startDate).isAfter(moment().add(1, 'd'), 'day');
      });
    };
  }

  function eventFilter (myConstant, ignoredSwimEvents, ignoredGymKeywords, ignoredIceKeywords) {
    return function(events) {
      if (!events || !events.length) { return; }
      return events.filter(function(event) {
        if (event.type === myConstant.GYM){
          for (var i in ignoredGymKeywords){
            if (event.summary.indexOf(ignoredGymKeywords[i]) != -1){
              return false;
            }
          }
        } else if (event.type === myConstant.ICE){
          for (var i in ignoredIceKeywords){
            if (event.summary.indexOf(ignoredIceKeywords[i]) != -1){
              return false;
            }
          }
        } else if (event.type === myConstant.SWIM) {
          return (ignoredSwimEvents.indexOf(event.summary) == -1);
        }
        return true;
      });
    };
  }

  function eventStartTime($filter){
    var angularDateFilter = $filter('date');
    return function(event) {
      if (moment(event.start.dateTime).isAfter(moment().add(1, 'd'), 'day')){
        return angularDateFilter(event.start.dateTime, event.allday ? 'EEEE' : "EEEE 'at' H:mm");
      } else {
        if (event.allday){
          return moment(event.start.dateTime).isSame(moment(), 'day') ? 'Today' : 'Tomorrow';
        }
        return angularDateFilter(event.start.dateTime, 'HH:mm');
      }
    }
  }

})();