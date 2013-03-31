(function(){
    function getUsernameFromLocation(loc) {
        var parts = loc.split('/');
        return parts[parts.indexOf('user')+1];
    }

    function formUrlForMonth(username, start) {
        return 'http://runkeeper.com/activitiesByDateRange?userName=' + username + '&startDate=' + start;
    }

    function getDataForMonth_fake(username, start) {
        return [
            {"distance":"6.13","distanceUnits":"mi","username":"654422030","activity_id":145965675,"dayOfMonth":"31","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"4.07","distanceUnits":"mi","username":"654422030","activity_id":145575024,"dayOfMonth":"30","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"1.90","distanceUnits":"mi","username":"654422030","activity_id":145472955,"dayOfMonth":"29","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"16.74","distanceUnits":"mi","username":"654422030","activity_id":144943434,"dayOfMonth":"27","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"2.18","distanceUnits":"mi","username":"654422030","activity_id":144524382,"dayOfMonth":"25","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"4.46","distanceUnits":"mi","username":"654422030","activity_id":144157907,"dayOfMonth":"23","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"7.05","distanceUnits":"mi","username":"654422030","activity_id":144043457,"dayOfMonth":"23","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"6.21","distanceUnits":"mi","username":"654422030","activity_id":143638806,"dayOfMonth":"21","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"10.39","distanceUnits":"mi","username":"654422030","activity_id":143181372,"dayOfMonth":"19","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"5.14","distanceUnits":"mi","username":"654422030","activity_id":142842839,"dayOfMonth":"17","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"5.33","distanceUnits":"mi","username":"654422030","activity_id":142426368,"dayOfMonth":"15","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"5.25","distanceUnits":"mi","username":"654422030","activity_id":141978509,"dayOfMonth":"13","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"5.17","distanceUnits":"mi","username":"654422030","activity_id":141234398,"dayOfMonth":"10","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"1.90","distanceUnits":"mi","username":"654422030","activity_id":140835517,"dayOfMonth":"9","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"13.70","distanceUnits":"mi","username":"654422030","activity_id":139889205,"dayOfMonth":"5","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false},
            {"distance":"5.17","distanceUnits":"mi","username":"654422030","activity_id":139277390,"dayOfMonth":"2","month":"Jan","year":"2013","type":"CARDIO","mainText":"Running","live":false}
        ];
    }

    function sumDistanceForMonth(username, start, callback) {
        $.ajax( formUrlForMonth(username, start))
            .success(function(data) {
                 data = jQuery.parseJSON(data);
                 var dateParts = start.split('-');
                 var month = dateParts[0], year = dateParts[2];
                 data = data['activities'][year][month];

                 var sum = 0;
                 for(var i=0; i<data.length; i++) {
                     sum += parseFloat(data[i]['distance'], 10);
                 }
                 callback(sum);
            });

    }

    var username = getUsernameFromLocation('http://runkeeper.com/user/654422030/activity/161520421');
    $('#activityHistoryMenu div.accordion').each(function(index, obj){
        var start = obj.getAttribute('data-date');
        sumDistanceForMonth(username, start, function(sum) {
            sum = Math.round(sum*100)/100;
            console.log(index, start, sum);
            $(obj).find('.mainText').html($(obj).find('.mainText').html() + ' (' + sum + ')');
        });
//        $('<div class="bubble">' + sum  + ' mi</div>').insertAfter();
    });
}());
