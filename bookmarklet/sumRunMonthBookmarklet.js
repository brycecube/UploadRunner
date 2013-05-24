(function(w, d){
  var RunkeeperMonthly = function RunkeeperMonthly(username) {
    if (!(this instanceof RunkeeperMonthly))
      return new RunkeeperMonthly(username);

    var self = this;
    self.username = username; //dynamic username per page
    self.init(); //fire this biatch
  };

  RunkeeperMonthly.prototype = {
    /*
    * Responsible for making the AJAX call that gathers all the events per month
    */
    gatherData: function(date) {
      var self = this,
          dateSplit = date.split('-'),
          month = dateSplit[0],
          year = dateSplit[2];

      var url = siteLocation + '/activitiesByDateRange?userName=' + self.username + '&startDate=' + date;
      $.getJSON(url, function(r){
        self.calculate(r.activities[year][month], date);
      });
    },

    /*
    * Appends the calculated monthly total to the page
    */
    append: function(date, monthTotal) {
      var self = this;
      var monthDom = d.querySelectorAll("[data-date=" + date + "]");
      monthDom[0].innerHTML += '<span style="font-size:10px;font-weight:bold;color:#888">' + monthTotal + 'mi </span>';
    },

    /*
    * Loops through all dom objects and gathers the data-date value of each month.
    * This arary is later used to append elements to the DOM
    */
    getDates: function() {
      var self = this;
      var i, actLen, actDate, actDates = [];

      for (i = 0, actLen = activities.length; i < actLen; i++) {
        actDate = activities[i].dataset.date;
        actDates.push(actDate);
      }

      self.coalate(actDates);
    },

    /*
    * rolls through the getDates array and fires the function that gets monthly data
    */
    coalate: function(dates) {
      var self = this;
      var i, actDateLen;

      for (i = 0, actDateLen = dates.length; i < actDateLen; i++) {
        self.gatherData(dates[i]);
      }
    },

    /*
    * calculates all the distance values of an individual month
    */
    calculate: function(data, date) {
      var self = this;
      var i, dataLen, day, totalDistance = 0;

      for (i = 0, dataLen = data.length; i < dataLen; i++) {
        day = data[i];
        totalDistance += (+day.distance);
      }

      totalDistance = Math.round(totalDistance*100)/100;

      self.append(date, totalDistance);
    },

    /*
    * fires getDates, which collects all dates
    * I may re-code the class to instantiate on each month
    */
    init: function() {
      var self = this;
      self.getDates();
    }
  };

  var activities = $('#activityHistoryMenu').children('div.accordion'),
      winLoc = w.location,
      siteLocation = winLoc.origin,
      user = winLoc.pathname.split('/')[2];
  var rkCalc = RunkeeperMonthly(user);
}(window, document));