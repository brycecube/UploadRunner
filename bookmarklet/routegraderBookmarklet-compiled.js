(function(){function f(a){return Math.round(100*a)/100}function k(a){return f(a/l)+"mi"}function m(a){a.deltaAlt=a.end.altitude-a.start.altitude;a.delta=a.end.totalDistance-a.start.totalDistance;a.grade=100*(a.deltaAlt/a.delta)}var l=5280,g=0.1*l,b=routePoints,c=[],d=max=b[0],e=0,h={start:b[0]},a;for(a=0;a<b.length;a++)b[a].altitude*=3.2808399,b[a].deltaDistance*=0.621371192*l,b[a].altitude<d.altitude&&(d=b[a]),b[a].altitude>max.altitude&&(max=b[a]),e+=b[a].deltaDistance,b[a].totalDistance=e,e-h.start.totalDistance>
g&&(h.end=b[a],c.push(h),h={start:b[a]});h.end=b[a-1];c.push(h);(function(a){for(var b=0;b<a.length;b++)m(a[b])})(c);g=[c[0]];for(a=1;a<c.length;a++)b=g[g.length-1],0.5>Math.abs(c[a].grade-b.grade)?(b.end=c[a].end,m(b)):g.push(c[a]);c=g;d=""+("\nMin: "+(f(d.altitude)+"'")+" at "+k(d.totalDistance));d+="\nMax: "+(f(max.altitude)+"'")+" at "+k(max.totalDistance);d+="\nTotal Distance: "+k(e);for(a=0;a<c.length;a++)e=c[a],3<Math.abs(e.grade)&&(d+="\n"+k(e.start.totalDistance)+" - "+k(e.end.totalDistance)+
" : "+(f(e.deltaAlt)+"'")+" over "+(f(e.delta)+"'")+" ( "+f(e.grade)+"% grade )");c=document.createElement("div");c.innerHTML="<pre>"+d+"</pre>";document.getElementById("routesMain").appendChild(c)})();
