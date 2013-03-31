(function() {
	var M2FT = 3.2808399;
	var KM2Mi = 0.621371192;
    var Mi2FT = 5280;
    var SPLIT_SIZE = 0.1 * Mi2FT;
    var SPLIT_DIFF_TOLERANCE = 0.5;
    var GRADE_DISPLAY_THRESHOLD = 3;

    function fmt(n) {
        return Math.round(n*100)/100.0;
    }

    function fmtFt(n) {
        return fmt(n) + "'";
    }

    function fmtMi(n) {
        return fmt( n / Mi2FT ) + "mi";
    }

    function calcSplit(split) {
        split["deltaAlt"] = split.end.altitude - split.start.altitude;
        split["delta"] = split.end.totalDistance - split.start.totalDistance;
        split["grade"] = split.deltaAlt / split.delta * 100;
    }

    function calcAllSplits(arr) {
        for(var i=0; i<arr.length; i++) {
            calcSplit(arr[i])
        }
    }

	var rp = routePoints;
    var splits = [];
	var min = max = rp[0];
    var totalDist = 0;
    var split = { "start": rp[0] };
    var i;
	for(i=0; i<rp.length; i++) {
        // First, convert all to feet
        rp[i].altitude *= M2FT;
        rp[i].deltaDistance *= KM2Mi * Mi2FT;

		if( rp[i].altitude < min.altitude ){
            min = rp[i];
        }
		if( rp[i].altitude > max.altitude ){
            max = rp[i];
        }
        totalDist += rp[i].deltaDistance;

        rp[i]["totalDistance"] = totalDist;

        // calculate split
        if( (totalDist - split.start.totalDistance) > SPLIT_SIZE ) {
            split["end"] = rp[i];
            splits.push(split);
            split = { "start": rp[i] };
        }
	}
    split["end"] = rp[i-1];
    splits.push(split);

    // calculate grade on splits
    calcAllSplits(splits);

    // merge similar-grade splits
    var finalSplits = [splits[0]];
    for(i=1; i<splits.length; i++) {
        var currentFinalSplit = finalSplits[finalSplits.length-1];
        if( Math.abs(splits[i].grade - currentFinalSplit.grade) < SPLIT_DIFF_TOLERANCE ) {
            // merge splits if similar
            currentFinalSplit.end = splits[i].end;
            calcSplit(currentFinalSplit);
        } else {
            // start new split if not
            finalSplits.push( splits[i] );
        }
    }

    splits = finalSplits;

    var output = "";
	output += "\nMin: " + fmtFt(min.altitude) + " at " + fmtMi(min.totalDistance);
    output += "\nMax: " + fmtFt(max.altitude) + " at " + fmtMi(max.totalDistance);
    output += "\nTotal Distance: " + fmtMi(totalDist);

    for(i=0; i<splits.length; i++) {
        var s = splits[i];
        if(Math.abs(s.grade) > GRADE_DISPLAY_THRESHOLD) {
            output += "\n" + fmtMi(s.start.totalDistance) + " - " + fmtMi(s.end.totalDistance) + " : " + fmtFt(s.deltaAlt) + " over "  + fmtFt(s.delta) + " ( " + fmt(s.grade) + "% grade )";
        }
    }
    var div = document.createElement("div");
    div.innerHTML = "<pre>" + output + "</pre>";
    document.getElementById("routesMain").appendChild(div);
})();
