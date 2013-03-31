(function(){
    function getUsernameFromLocation(loc) {
        var parts = loc.split('/');
        return parts[parts.indexOf('user')+1];
    }

    function formUrlForMonth(username, start) {
        return 'http://runkeeper.com/activitiesByDateRange?userName=' + username + '&startDate=' + start;
    }

    function sumDistanceForMonth(username, start, callback) {
        $.ajax( formUrlForMonth(username, start) )
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

    var username = getUsernameFromLocation(window.location.href);
    $('#activityHistoryMenu div.accordion').each(function(index, obj){
        var start = obj.getAttribute('data-date');
        sumDistanceForMonth(username, start, function(sum) {
            sum = Math.round(sum*100)/100;
            $(obj).find('.mainText').html($(obj).find('.mainText').html() + ' (' + sum + ')');
        });
    });
}());
