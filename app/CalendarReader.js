(function() {
  'use strict';
  
  angular.module('recApp').factory('CalendarReader', ['$http', 'myConstant', calendarReader]);

  function calendarReader($http, myConstant){
    return function(calId, type){
      var url = "app/gcal.php?calId=" + calId + '&timeMax=' + myConstant.timeMax + '&timeMin=' + myConstant.timeMin;
      var json = $http.get(url).success(function(data, status, headers, config) {
        angular.forEach(data.items, function (event) {
          event.type = type;
          if (event.start.dateTime){
            var start = moment(event.start.dateTime);
            var end = moment(event.end.dateTime);
            event.duration = end.diff(start, 'hours', true) + 'h';
            event.allday = false
          } else {
            event.duration = "All day"
            event.start.dateTime = event.start.date
            event.end.dateTime = event.end.date
            event.allday = true
          }

          event.start.url = moment(event.start.dateTime).format('YYYYMMDD\\THHmmss');
          event.end.url = moment(event.end.dateTime).format('YYYYMMDD\\THHmmss');
          event.timeZone = event.start.timeZone;
          if (!event.timeZone){
            event.timeZone = 'America/Vancouver';
          }

          if (type === myConstant.GYM){
              var locationEvent = event.summary.split(": ")
              event.room = locationEvent[0];
              event.sport = locationEvent[1];
          } else if (type === myConstant.ICE){
              var locationEvent = event.summary.split(" - ")
              event.room = locationEvent[0];
              event.sport = locationEvent[1];
          } else if (type === myConstant.SWIM) {
              event.sport = event.summary;
              event.room = "Aquatic Centre";
          } else if (type === myConstant.YOGA) {
              event.sport = "Yoga: " + event.summary;
              event.room = event.location;
          }
        });
        return data.items;
      });
      return json;
    }
  }

})();