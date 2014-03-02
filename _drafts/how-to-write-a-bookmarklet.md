A bookmarklet is a section of JavaScript that executes from a browser bookmark.



## The base code

This is the base code that makes up a bookmarklet.

<!--prettify lang=js-->
    javascript:(
      function() {
      	alert('ZOMG');
      }
    )()

After being minified it's placed within an anchor typically with the instruction of dragging it to your bookmarks bar.

<!--prettify lang=html-->
    <p>Drag <a class="bookmarklet" href="javascript:(function(){alert('ZOMG')})()">ZOMG Alert</a> to your bookmarks bar.</p>



## Injecting the script

Normally a bookmarklet downloads a script from some external server and injects it into the page. This allows the script to be a large as necessary and also enable automatic updating. Here is an example bookmarklet that injects a script into the page:

<!--prettify lang=js-->
    var script = document.createElement('script');
    script.src = '//www.growingwiththeweb.com/bookmarklet.js';
    document.body.appendChild(script);

The usage of `//` ensures the same URL scheme (`http`/`https`) as the page.



## Keeping it fresh

The browser's cache can work against us with bookmarklets, holding on to the old script when there is a newer version available. To get around this we can use the unique query string trick to force a new download.

<!--prettify lang=js-->
    script.src = '//www.growingwiththeweb.com/bookmarklet.js?' + (+new Date/1);



## Running multiple times



<!--prettify lang=js-->
    var script = document.getElementById('someUniqueId');
    if (script) {
      script.parentNode.removeChild(s);
    }
    script = document.createElement('script');
    script.src = url;
    script.setAttribute('id', 'someUniqueId');
    document.body.appendChild(script);



## Pulling it all together