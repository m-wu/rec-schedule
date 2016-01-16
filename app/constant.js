(function() {
    'use strict';

    angular
        .module('recApp')
        .constant('myConstant', {
            'swimCal': '266oh0efbhdiqnrajffbvvii0c@group.calendar.google.com',
            'gymCal': 'fj5vr6sh22qr94o1ioneisahr0@group.calendar.google.com',
            'iceCal': 'itcedpukq7pqod1n7on5akhii4@group.calendar.google.com',
            'yogaCal': 'president.ubcyogaclub@gmail.com',
            'timeMin': moment().startOf('day').format(),
            'timeMax': moment().startOf('day').add(7, 'd').format(),
            'SWIM': 'swim',
            'GYM': 'gym',
            'ICE': 'ice',
            'YOGA': 'yoga'})
        .constant('ignoredSwimEvents', ['Patio Open', 'Inflatables Setup', 'Diving Boards Open'])
        .constant('ignoredGymKeywords', ['Camp', 'Closed', 'Varsity', 'Rental', 'League', 'IGUBC'])
        .constant('ignoredIceKeywords', ['Figure Skating', 'Stick', 'Hockey'])
        .constant('sportFilter', [{'label':'All', 'key':''}, 
                                  {'label':'羽毛球', 'key':'Badminton'},
                                  {'label':'篮球', 'key':'Basketball'},
                                  {'label':'排球', 'key':'Volleyball'},
                                  {'label':'滑冰', 'key':'Skating'},
                                  {'label':'游泳', 'key':'Swim'},
                                  {'label':'瑜伽', 'key':'Yoga'}]);
})();