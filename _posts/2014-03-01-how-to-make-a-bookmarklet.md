---
layout      : post
title       : How to make a bookmarklet
draft       : 1
tags        : [HTML, JavaScript]
primarytag  : JavaScript
intro       : A bookmarklet is a section of JavaScript that executes from a browser bookmark.
---

A bookmarklet is typically just a self-executing JavaScript function.

<!--prettify lang=js-->
    (function() {
      // Do something
    })()

After being minified it's placed within an anchor's `href` attribute with `javascript:` at the start. Typically the surrounding text indicates that it is a bookmarklet by giving instructions to dragging it to your bookmarks bar.

<!--prettify lang=html-->
    <p>Drag <a class="bookmarklet" href="javascript:(function(){alert('ZOMG');})()">ZOMG Alert</a> to your bookmarks bar.</p>



## Injecting the script

Bookmarklets usually download a script from some external server and injects it into the page. This allows the script to be a large as necessary and also enables automatic updating. Here is an example bookmarklet that injects a script into the page:

<!--prettify lang=js-->
    (function () {
      var script = document.createElement('script');
      script.src = '//www.growingwiththeweb.com/bookmarklet.js';
      document.body.appendChild(script);
    })()

The usage of `'//'` in the URL ensures the same scheme (http/https) as the page is used for the request.



## Keeping it fresh

The browser's cache can work against us with bookmarklets by holding on to the old script when there is a newer version available. To get around this we can use the unique query string trick to force a new download.

<!--prettify lang=js-->
    (function () {
      var script = document.createElement('script');
      script.src = '//www.growingwiththeweb.com/bookmarklet.js?' + 
                   Math.floor((new Date).getTime()/3600000);
      document.body.appendChild(script);
    })()

The timestamp added to the query string above is the current timestamp divided by 3600000 (1000*60*60) to reduce precision to hourly, meaning the script will only be cached at most one time per hour.



## Running multiple times

Special considerations may need to be made if the script is going to be run multiple times, such as resetting the state of the script or removing the old script from the page.

<!--prettify lang=js-->
    (function () {
      var uniqueId = 'gwtw-bookmarklet';
      var script = document.getElementById(uniqueId);
      if (script) {
        script.parentNode.removeChild(s);
      }
      script = document.createElement('script');
      script.src = '//www.growingwiththeweb.com/bookmarklet.js?' + 
                   Math.floor((new Date).getTime() / 3600000);
      script.id = uniqueId;
      document.body.appendChild(script);
    })()



## Putting it all together

Once the script is all done, minify the Javascript and add `javascript:` to the front before adding it to the anchor.

<!--prettify lang=html-->
    <p>Drag <a class="bookmarklet" href="javascript:(function(){var a=document.getElementById("gwtw-bookmarklet");a&&a.parentNode.removeChild(s);a=document.createElement("script");a.src="//www.growingwiththeweb.com/bookmarklet.js?"+Math.floor((new Date).getTime()/3600000);a.id="gwtw-bookmarklet";document.body.appendChild(a)})()">the bookmarklet</a> to your bookmarks bar.</p>