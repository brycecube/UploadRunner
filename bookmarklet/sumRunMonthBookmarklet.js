(function(w, d){
  console.clear();
  var RunkeeperMonthly = function RunkeeperMonthly() {
    if (!(this instanceof RunkeeperMonthly))
      return new RunkeeperMonthly();

    var self = this;
    self.init(); //fire this biatch
  };

  /*
  * Functionality to loop through and fire all monthly calcs
  */
  RunkeeperMonthly.prototype = {
    /*
    * gets all the dom elements per month
    */
    getDates: function() {
      var self = this;
      var i, actLen, activity;

      for (i = 0, actLen = activities.length; i < actLen; i++) {
        activity = activities[i];
        calcRkMonth(activity, activity.dataset.date);
      }
    },

    /*
    * fires getDates, which collects all dates
    */
    init: function() {
      var self = this;
      self.getDates();
    }
  };


  /*
  * Class for each month calculation and appending
  */
  var calcRkMonth = function calcRkMonth(el, date) {
    if (!(this instanceof calcRkMonth))
      return new calcRkMonth(el, date);

    var self = this;

    var splitDate = date.split('-');
    self.date = date;
    self.month = splitDate[0];
    self.year = splitDate[2];
    self.element = el;
    self.username = user;

    self.init(el, date);
  };

  calcRkMonth.prototype = {
    /*
    * fire apiCall with data
    */
    init: function() {
      var self = this;
      self.apiCall();
    },

    /*
    * makes the API call to get info
    */
    apiCall: function() {
      var self = this;
      var url = siteLocation + '/activitiesByDateRange?userName=' + self.username + '&startDate=' + self.date;

      $.getJSON(url, function(r){
          self.calculate(r.activities[self.year][self.month]);
      });
    },

    /*
    * calculates that month
    */
    calculate: function(data) {
      var self = this;
      var i, dataLen, day, totalDistance = 0;

      for (i = 0, dataLen = data.length; i < dataLen; i++) {
        day = data[i];
        totalDistance += (+day.distance);
      }

      totalDistance = Math.round(totalDistance*100)/100;
      self.append(totalDistance);
    },

    /*
    * Appends the calculated monthly total to the page
    */
    append: function(monthTotal) {
      var self = this;
      self.element.innerHTML += '<span style="font-size:10px;font-weight:bold;color:#888">' + monthTotal + 'mi </span>';
    }
  };

  var activities = $('#activityHistoryMenu').children('div.accordion'),
      windowLocation = w.location,
      siteLocation = windowLocation.origin,
      user = windowLocation.pathname.split('/')[2];

  var rkCalc = RunkeeperMonthly();
}(window, document));