!function(){function a(){e.innerHTML=c,f.classList.add(d)}var b="Show tags",c="Hide tags",d="active",e=document.querySelector(".toggle-button"),f=document.querySelector(".tag-toggle-container");e.addEventListener("click",function(){e.innerHTML===b?a():(e.innerHTML=b,f.classList.remove(d))}),-1===window.location.href.indexOf("?")&&a()}(),function(a){function b(){for(var b="",c=document.createElement("menu"),d=0;d<a.length;d++){if(b.toUpperCase()!==a[d][0].toUpperCase()){b=a[d][0].toUpperCase(),b.match(/[a-zA-Z]/g)||(b="#");var e=document.createElement("li");e.innerHTML=b,e.classList.add("letter-header"),c.appendChild(e)}var f=document.createElement("button");f.innerHTML=a[d],v[a[d]]={elem:f,neighbours:[]};var g=document.createElement("li");g.appendChild(f),c.appendChild(g)}var h=document.querySelector(".tag-container");h.classList.add("show-all"),h.appendChild(c)}function c(){for(var a=0;a<s.length;a++)for(var b=0;b<s[a].tags.length;b++)for(var c=0;c<s[a].tags.length;c++)b!==c&&-1===v[s[a].tags[b]].neighbours.indexOf(s[a].tags[c])&&v[s[a].tags[b]].neighbours.push(s[a].tags[c]);for(var a=0;a<t.length;a++)for(var b=0;b<t[a].tags.length;b++)for(var c=0;c<t[a].tags.length;c++)b!==c&&-1===v[t[a].tags[b]].neighbours.indexOf(t[a].tags[c])&&v[t[a].tags[b]].neighbours.push(t[a].tags[c])}function d(){for(var a=document.querySelectorAll("article"),b=0;b<a.length;b++){s[b]={elem:a[b],tags:[]};for(var c=a[b].querySelectorAll(".tags a"),d=0;d<c.length;d++)s[b].tags[d]=c[d].innerHTML}}function e(){for(var a=document.querySelectorAll(".tag-container button"),b=0;b<a.length;b++)a[b].addEventListener("click",g)}function f(){var a=r("t");if(a)for(var b=a.split(","),c=0;c<b.length;c++)g.call(v[b[c]].elem);for(var c=0;c<s.length;c++)s[c].elem.classList.add("active")}function g(){this.classList.contains("selected")?(this.classList.remove("selected"),h(this.innerHTML),o(this.innerHTML)):(this.classList.add("selected"),i(this.innerHTML),n(this.innerHTML))}function h(a){for(var b=0;b<u.length;b++)if(u[b]===a){u.splice(b,1);break}k(a)}function i(a){u.push(a),j(a)}function j(a){for(var b=0;b<s.length;b++)-1===s[b].tags.indexOf(a)&&m(b--)}function k(a){if(!u.length){for(var b=0;b<t.length;b++)l(b--);for(var c=document.querySelectorAll(".tag-container .active"),b=0;b<c.length;b++)c[b].classList.remove("active")}for(var b=0;b<t.length;b++)if(-1===t[b].tags.indexOf(a)){for(var d=!0,e=0;e<u.length;e++)if(-1===t[b].tags.indexOf(u[e])){d=!1;break}d&&l(b--)}}function l(a){t[a].elem.classList.add("active"),s.push(t[a]),t.splice(a,1)}function m(a){s[a].elem.classList.remove("active"),t.push(s[a]),s.splice(a,1)}function n(a){if(document.querySelector(".tag-container").classList.contains("show-all")&&document.querySelector(".tag-container").classList.remove("show-all"),1===u.length)for(var b=0;b<v[a].neighbours.length;b++)v[v[a].neighbours[b]].elem.classList.add("active");else{for(var c=!0,b=0;b<u.length;b++)u[b]!==a&&-1===v[u[b]].neighbours.indexOf(a)&&(c=!1);if(c){for(var d=document.querySelectorAll(".tag-container .active:not(.selected)"),b=0;b<d.length;b++)-1===v[a].neighbours.indexOf(d[b].innerHTML)&&d[b].classList.remove("active");for(var b=0;b<d.length;b++){for(var e=!1,f=0;f<s.length;f++)if(-1!==s[f].tags.indexOf(d[b].innerHTML)){e=!0;break}e||d[b].classList.remove("active")}}else for(var d=document.querySelectorAll(".tag-container .active:not(.selected)"),b=0;b<d.length;b++)d[b].classList.remove("active")}v[a].elem.classList.add("active")}function o(a){if(u.length){if(q())for(var b=document.querySelectorAll(".tag-container button:not(.active)"),c=0;c<b.length;c++)p(b[c]);for(var d=!1,c=0;c<u.length;c++)for(var e=0;e<v[u[c]].neighbours.length;e++)if(-1===v[u[c]].neighbours.indexOf(a)){d=!0;break}d&&v[a].elem.classList.remove("active"),p(v[a].elem)}else{document.querySelector(".tag-container").classList.add("show-all");for(var c=0;c<v.length;c++)v[c].elem.classList.remove("active")}}function p(a){for(var b=!1,c=0;c<s.length;c++)if(-1!==s[c].tags.indexOf(a.innerHTML)){b=!0;break}b&&a.classList.add("active")}function q(){for(var a=0;a<u.length;a++)for(var b=a+1;b<u.length;b++)if(-1===v[u[a]].neighbours.indexOf(u[b])||-1===v[u[b]].neighbours.indexOf(u[a]))return!1;return!0}function r(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null==c?"":decodeURIComponent(c[1].replace(/\+/g," "))}var s=[],t=[],u=[],v={};d(),b(),c(),e(),f()}(tagNames);