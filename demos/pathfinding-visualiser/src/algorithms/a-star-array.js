!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["core","canvas-helper","map-node","a-star-common"],b):"object"==typeof exports&&(module.exports=b(require("../core"),require("../canvas-helper"),require("../map-node"),require("./a-star-common")))}(this,function(a,b,c,d){"use strict";function e(a,c,e,g,h){for(var i=0;i<a.length;i++)if(-1===f(g,a[i])){var j=f(e,a[i]);-1===j?(a[i].f=a[i].g+d.heuristic(a[i],c),e.push(a[i]),h.push({f:b.drawOpenListNode,x:a[i].x,y:a[i].y})):a[i].g<e[j].g&&(a[i].f=a[i].g+d.heuristic(a[i],c),e[j]=a[i])}}function f(a,b){for(var c=0;c<a.length;c++)if(b.equals(a[c]))return c;return-1}var g={};return g.run=function(c,f){var g,h=[],i=[],j=c.start,k=c.goal,l=[];for(j.f=j.g+d.heuristic(j,k),i.push(j);i.length>0;){var m=0;for(g=1;g<i.length;g++)i[g].f<i[m].f&&(m=g);var n=i[m];if(n.equals(k)){var o=a.timeNow(),p=d.buildSummaryMessage(c,i.length,h.length);return void f(p,l,n,i,o)}i.splice(m,1),h.push(n),l.push({f:b.drawVisited,x:n.x,y:n.y});var q=d.getNeighbourNodes(c,n);e(q,k,i,h,l)}f([{result:"No path exists"}],l,void 0,void 0,a.timeNow())},g});