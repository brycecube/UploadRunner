(function(){function f(a,b,d){$.ajax("http://runkeeper.com/activitiesByDateRange?userName="+a+"&startDate="+b).success(function(c){c=jQuery.parseJSON(c);var a=b.split("-");c=c.activities[a[2]][a[0]];for(var e=a=0;e<c.length;e++)a+=parseFloat(c[e].distance,10);d(a)})}var g=function(a){a=a.split("/");return a[a.indexOf("user")+1]}(window.location.href);$("#activityHistoryMenu div.accordion").each(function(a,b){var d=b.getAttribute("data-date");f(g,d,function(a){a=Math.round(100*a)/100;$(b).find(".mainText").html($(b).find(".mainText").html()+
" ("+a+")")})})})();
