!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["core","canvas-helper","map"],b):"object"==typeof exports?module.exports=b(require("./core"),require("./canvas-helper"),require("./map")):a.canvasHelper=b(core,canvasHelper,Map)}(this,function(a,b,c){"use strict";function d(a,c,e,f){var g=a.shift();(g.x!==h.start.x||g.y!==h.start.y)&&g.f.call(null,g.x,g.y),a.length?f?k=setTimeout(function(){d(a,c,e,f)},f()):a.length%200===0?setTimeout(function(){d(a,c,e,f)},1):d(a,c,e,f):c&&(b.drawStartGoal(c.x,c.y),b.drawPath(c,e))}function e(a){var b;a||(a=window.event),a.target?b=a.target:a.srcElement&&(b=a.srcElement),3===b.nodeType&&(b=b.parentNode);var c=a.pageX-b.offsetLeft,d=a.pageY-b.offsetTop;return{x:c,y:d}}function f(){window.clearTimeout(j),j=setTimeout(g,200)}function g(){a.setCanvasDimensions(b.getCanvasWidth(),b.getCanvasHeight()),l.clear(),l.generateMap(),h.setGoal(a.MAP_WIDTH-1,a.MAP_HEIGHT-1)}var h,i,j,k,l={};return l.init=function(d){b.setCanvas(d),a.setCanvasDimensions(b.getCanvasWidth(),b.getCanvasHeight()),h=new c(a.MAP_WIDTH,a.MAP_HEIGHT),l.clear(),window.addEventListener("resize",f)},l.setAlgorithm=function(a){i=a},l.setGoalToMouse=function(b){var c=e(b);c.x=Math.floor(c.x/a.MAP_SCALE),c.y=Math.floor(c.y/a.MAP_SCALE),h.setGoal(c.x,c.y)},l.clear=function(){k&&clearTimeout(k),b.clearCanvas(),h.clear()},l.run=function(a,c){k&&clearTimeout(k),b.clearCanvas(),b.drawObstacles(h);var e=performance.now();i.run(h,function(f,g,i,j,k){var l="",m=k-e;f.push({result:"Operation took "+m.toFixed(2)+"ms"});for(var n=0;n<f.length;n++){var o=f[n];l+=o.colour?'<pv-summary-line hascolour colour="'+o.colour+'">'+o.result+"</pv-summary-line>":"<pv-summary-line>"+o.result+"</pv-summary-line>"}b.drawStartGoal(h.start.x,h.start.y),d(g,i,j,c?c:0),a(l)})},l.generateMap=function(c,d,e){k&&clearTimeout(k),a.setMapScale(c),b.clearCanvas(),h.generate(a.MAP_WIDTH,a.MAP_HEIGHT,d,e),b.drawObstacles(h)},l});