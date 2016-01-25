(function() {
  'use strict';

  angular.module('recApp').controller('ScheduleController', 
    ['$scope', '$http', '$cookies', 'CalendarReader', 'myConstant', 'sportFilter', scheduleController]);

  function scheduleController($scope, $http, $cookies, CalendarReader, myConstant, sportFilter) {    
    $scope.sportFilter = sportFilter;

    CalendarReader(myConstant.swimCal, myConstant.SWIM).then(function(data){
      Array.prototype.push.apply($scope.events, data.data.items);
    });

    CalendarReader(myConstant.gymCal, myConstant.GYM).then(function(data){
      Array.prototype.push.apply($scope.events, data.data.items);
    });

    CalendarReader(myConstant.iceCal, myConstant.ICE).then(function(data){
      Array.prototype.push.apply($scope.events, data.data.items);
    });

    CalendarReader(myConstant.yogaCal, myConstant.YOGA).then(function(data){
      Array.prototype.push.apply($scope.events, data.data.items);
    });

    $scope.todayDay = moment().format('dddd');
    $scope.tomorrowDay = moment().add(1, 'd').format('dddd');
    
    $scope.selectedSport = $cookies.get('selectedSport');
    if ($scope.selectedSport == null){
      $scope.selectedSport = '';
    }

    $scope.$watch('selectedSport', function() {
      $cookies.put('selectedSport', $scope.selectedSport);
     });

    $scope.events = [];

    $scope.eventStarted = function(event){
      return !event.allday & moment().isBetween(event.start.dateTime, event.end.dateTime);
    };

    $scope.isFutureEvent = function(event){
      return moment(event.start.dateTime).isAfter();
    };

    $scope.isPastEvent = function(event){
      return moment(event.end.dateTime).isBefore();
    };

    $scope.timeRemaining = function(event){
      return moment(event.end.dateTime).fromNow();
    };

    $scope.timeUntil = function(event){
      return moment(event.start.dateTime).fromNow();
    };

    $scope.getCalEntryUrl = function(event){
      return "https://www.google.com/calendar/render?action=TEMPLATE&text=" + event.sport 
      + "&dates=" + event.start.url + "/" + event.end.url + "&ctz=" + event.timeZone 
      + "&location=" + event.room + "&sf=true&output=xml";
    }
  }

})();