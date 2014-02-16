---
layout      : post
title       : jQuery attr('id') vs [0].id performance
tags        : [Chrome, JavaScript, jQuery, Optimisation]
primarytag  : jQuery
intro       : So I was wondering for a while exactly what the performance difference is between the jQuery function <code>attr('id')</code> and getting the native JavaScript object and grabbing the id that way was. Surely <code>attr('id')</code> was slower but how much slower... I decided to write a little HTML page that tested each method by doing 1 million operations of each. In interest of being complete I added the <code>getAttribute</code> and <code>get(0).id</code> methods also.
---

Here are the results of the test:

<pre>
div.attr('id'): 1545ms
div.attr('id'): 1536ms
div.attr('id'): 1558ms

div[0].id: <mark>48ms</mark>
div[0].id: <mark>46ms</mark>
div[0].id: <mark>45ms</mark>

div.get(0).id: 59ms
div.get(0).id: 69ms
div.get(0).id: 62ms

div[0].getAttribute('id'): 74ms
div[0].getAttribute('id'): 72ms
div[0].getAttribute('id'): 74ms
</pre>

So the `div[0].id` method is *significantly* faster than `div.attr('id')` which totally makes sense as when you think about it, `div[0]` is simply getting the first object off of an array/object while `div.attr('id')` has to figure out what the parameter is and deal with it that way. Stepping through the call to `attr` confirms this.

It's worth noting that this performance difference is of course very small, 1.4 seconds to do something 1 million times isn't too bad and you'll only really notice these things when they add up in huge amounts.

But anyway, there it is. `$(element)[0].id` is the most efficient way to get the id of a jQuery object, the rest all do a little extra necessary work. This testing was done in Chrome, numbers will change in other browsers but I don't expect that the winner and loser would change between them.



## HTML

<!--prettify lang=html-->
    <html>
    <head>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
      <script>
        var numberOfTests = 1000000;
        var div;
        
        $().ready(function () {
          $('#test-attr').click(testAttr);
          $('#test-convert').click(testConvert);
          $('#test-get').click(testGet);
          $('#test-get-attribute').click(testGetAttribute);
          div = $('div');
        });
        
        function testAttr() {
          console.time('div.attr(\'id\')');
          for (var i = 0; i < numberOfTests; i++) {
            var id = div.attr('id');
          }
          console.timeEnd('div.attr(\'id\')')
        }
        
        function testConvert() {
          console.time('div[0].id');
          for (var i = 0; i < numberOfTests; i++) {
            var id = div[0].id;
          }
          console.timeEnd('div[0].id')
        }
        
        function testGet() {
          console.time('div.get(0).id');
          for (var i = 0; i < numberOfTests; i++) {
            var id = div.get(0).id;
          }
          console.timeEnd('div.get(0).id')
        }
        
        function testGetAttribute() {
          console.time('div[0].getAttribute(\'id\')');
          for (var i = 0; i < numberOfTests; i++) {
            var id = div[0].getAttribute('id');
          }
          console.timeEnd('div[0].getAttribute(\'id\')')
        }
      </script>
    </head>
    <body>
      <button id="test-attr">Test $.attr('id')</button>
      <button id="test-convert">Test $[0].id</button>
      <button id="test-get">Test $.get(0).id</button>
      <button id="test-get-attribute">Test $[0].getAttribute('id')</button>
      <div></div>
    </body>
    </html>