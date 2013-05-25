(function(){
  /*
  * function for calculating each month
  */
  function calcRkMonth(activity) {
    var date;

    /*
    * gets the api data for each month
    */
    function getData() {
      date = activity.dataset.date;

      var url = '/activitiesByDateRange?userName=' + user + '&startDate=' + date;

      $.getJSON(url, function(response){
        append(monthTotal(response));
      });
    }

    /*
    * calculates that month
    */
    function monthTotal(response) {
      var i, dataLen, day,
          totalDistance = 0,
          split = date.split('-');

      response = response.activities[split[2]][split[0]];
      for (i = 0, dataLen = response.length; i < dataLen; i++) {
        day = response[i];
        totalDistance += (+day.distance);
      }

      return Math.round(totalDistance*100)/100;
    }

    /*
    * Appends the calculated monthly total to the page
    */
    function append(distance) {
      activity.innerHTML += '<span style="font-size:10px;font-weight:bold;color:#888">' + distance + 'mi </span>';
    }

    /*
    * Publically accessible methods
    */
    return {
      getData: getData
    };
  }

  var user = window.location.pathname.split('/')[2];

  (function RunkeeperMonthly() {
    var activities = document.querySelectorAll('[data-date]'),
        i, actLen, activity;

    /*
    * Fires a calculation function for each month
    */
    for (i = 0, actLen = activities.length; i < actLen; i++) {
      activity = activities[i] || null;
      if (activity) {
        calcRkMonth(activity).getData();
      }
    }
  }());

}());