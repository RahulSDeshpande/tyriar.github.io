!function(){function a(){z=document.getElementById("astar"),z&&z.getContext&&(A=z.getContext("2d"),z.width=F,z.height=G,B=[],C=new c(0,0),D=new c(K-1,L-1),E=!1,b(),s())}function b(){z.addEventListener("mousedown",d),z.addEventListener("mousemove",f),z.addEventListener("mouseup",e),document.getElementById("run").addEventListener("click",g),document.getElementById("clear").addEventListener("click",s)}function c(a,b,c,d){this.x=a,this.y=b,this.g=0,this.f=0,this.parent=c,c&&(this.g=c.g+d)}function d(a){E=!0,h(a)}function e(){E=!1}function f(a){E&&h(a)}function g(){this.setAttribute("disabled","disabled"),r(),k(C,D),this.removeAttribute("disabled")}function h(a){var b=j(a);b.x=Math.floor(b.x/J),b.y=Math.floor(b.y/J);for(var c=b.x-2;c<=b.x+2;c++)for(var d=b.y-2;d<=b.y+2;d++)1==a.which?i(c,d)&&B[c][d]&&(B[c][d]=!1,u(c,d)):3==a.which&&i(c,d)&&!B[c][d]&&(B[c][d]=!0,v(c,d))}function i(a,b){return a>=0&&K>a&&b>=0&&L>b}function j(a){var b;a||(a=window.event),a.target?b=a.target:a.srcElement&&(b=a.srcElement),3==b.nodeType&&(b=b.parentNode);var c=a.pageX-$(b).offset().left,d=a.pageY-$(b).offset().top;return{x:c,y:d}}function k(a,b){var c=[],d=[a];for(d[0].f=d[0].g+n(d[0],b);d.length>0;){for(var e=0,f=1;f<d.length;f++)d[f].f<d[e].f&&(e=f);var g=d[e];if(m(g,b)){q(c,d,g);var h="Map size = "+K+"x"+L+"<br />Total number of nodes = "+K*L+"<br />Number of nodes in open list = "+d.length+"<br />Number of nodes in closed list = "+c.length;return void(document.getElementById("info").innerHTML=h)}d.splice(e,1),c[c.length]=g,w(g.x,g.y);for(var i=p(g),f=0;f<i.length;f++)if(-1==l(c,i[f])){var j=l(d,i[f]);-1==j?(i[f].f=i[f].g+n(i[f],b),d[d.length]=i[f]):i[f].g<d[j].g&&(i[f].f=i[f].g+n(i[f],b),d[j]=i[f])}}document.getElementById("info").innerHTML="No path exists"}function l(a,b){for(var c=0;c<a.length;c++)if(m(b,a[c]))return c;return-1}function m(a,b){return a.x==b.x&&a.y==b.y}function n(a,b){return o(a,b)}function o(a,b){var c=Math.min(Math.abs(a.x-b.x),Math.abs(a.y-b.y)),d=Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y));return I*c+H*(d-c)}function p(a){var b=[],d=0;return a.x>0&&(B[a.x-1][a.y]&&(b[d++]=new c(a.x-1,a.y,a,H)),a.y>0&&B[a.x-1][a.y-1]&&B[a.x-1][a.y]&&B[a.x][a.y-1]&&(b[d++]=new c(a.x-1,a.y-1,a,I)),a.y<L&&B[a.x-1][a.y+1]&&B[a.x-1][a.y]&&B[a.x][a.y+1]&&(b[d++]=new c(a.x-1,a.y+1,a,I))),a.x<K-1&&(B[a.x+1][a.y]&&(b[d++]=new c(a.x+1,a.y,a,H)),a.y>0&&B[a.x+1][a.y-1]&&B[a.x+1][a.y]&&B[a.x][a.y-1]&&(b[d++]=new c(a.x+1,a.y-1,a,I)),a.y<L&&B[a.x+1][a.y+1]&&B[a.x+1][a.y]&&B[a.x][a.y+1]&&(b[d++]=new c(a.x+1,a.y+1,a,I))),a.y>0&&B[a.x][a.y-1]&&(b[d++]=new c(a.x,a.y-1,a,H)),a.y<L-1&&B[a.x][a.y+1]&&(b[d++]=new c(a.x,a.y+1,a,H)),b[d++],b}function q(a,b,c){for(x(D.x,D.y),x(C.x,C.y),A.beginPath(),A.moveTo((c.x+.5)*J,(c.y+.5)*J);c.parent;)c=c.parent,A.lineTo((c.x+.5)*J,(c.y+.5)*J);A.strokeStyle=P,A.lineWidth=M,A.stroke(),A.closePath()}function r(){A.fillStyle=N,A.fillRect(0,0,F,G),t()}function s(){A.fillStyle=N,A.fillRect(0,0,F,G);for(var a=0;K>a;a++){B[a]=[];for(var b=0;L>b;b++)B[a][b]=!0}}function t(){for(var a=0;K>a;a++)for(var b=0;L>b;b++)B[a][b]||u(a,b)}function u(a,b){y(a,b,O)}function v(a,b){y(a,b,N)}function w(a,b){y(a,b,Q)}function x(a,b){y(a,b,P)}function y(a,b,c){A.fillStyle=c,A.fillRect(a*J,b*J,J,J)}var z,A,B,C,D,E,F=640,G=480,H=1,I=1.414,J=10,K=F/J,L=G/J,M=4,N="#EEE",O="#2D2D30",P="#0C0",Q="#44F";a()}();