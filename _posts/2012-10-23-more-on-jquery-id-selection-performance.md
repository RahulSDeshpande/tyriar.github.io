---
layout      : post
title       : More on jQuery id selection performance
tags        : [Chrome, Firefox, Internet Explorer, JavaScript, jQuery, Opera, Optimisation, Safari]
socialimage : /images/2012/10/23/id-perf.png
primarytag  : jQuery
intro       : In response to Ron's comment on the <a href="/2012/10/jquery-attrid-vs-0id-performance.html"><code>attr('id')</code> vs <code>[0].id</code></a> post last week asking about the <code>jQuery.fn.prop</code>'s vs <code>jQuery.fn.attr</code>'s performance, I extended the program to include <code>prop</code> and enabled profiling across all browsers (thanks to <a href="http://remysharp.com/2007/04/20/performance-profiling-javascript/">time.js</a>). The program also does the tests a little more thoroughly, running 1000000 operations 5 times per each operation and averages the result.
---

Some of the result surprised me a little, in particular Safari beating Chrome on `d.attr('id')` but nothing else, and `d.prop('id')` was the clear winner.

{% include post-image.html class="center-aligned" alt="ID perf" src="/images/2012/10/23/id-perf.png" %}

These charts are going to be a lot nicer when we can start using IE10 ;)



## Chrome 22
<pre>
d.attr('id'): 1164ms
d.prop('id'): <mark>947ms</mark>
d[0].id: <mark>56ms</mark>
d.get(0).id: <mark>64ms</mark>
d[0].getAttribute('id'): <mark>95ms</mark>
</pre>



## Firefox 16

<pre>
d.attr('id'): 2787ms
d.prop('id'): 2198ms
d[0].id: 161ms
d.get(0).id: 171ms
d[0].getAttribute('id'): 188ms
</pre>



## IE 9

<pre>
d.attr('id'): 5051ms
d.prop('id'): 2780ms
d[0].id: 273ms
d.get(0).id: 298ms
d[0].getAttribute('id'): 793ms
</pre>



## Opera 12

<pre>
d.attr('id'): 1534ms
d.prop('id'): 1377ms
d[0].id: 312ms
d.get(0).id: 324ms
d[0].getAttribute('id'): 354ms
</pre>



## Safari 5.1

<pre>
d.attr('id'): <mark>1082ms</mark>
d.prop('id'): 997ms
d[0].id: 140ms
d.get(0).id: 155ms
d[0].getAttribute('id'): 190ms
</pre>



## Test

<!--prettify lang=html-->
    <html>
    <head>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
      <script src="http://remysharp.com/time.packed.js"></script>
      <script>
        var numberOfTypeTests = 5;
        var numberOfIdTests = 1000000;
        var div;

        $().ready(function () {
          $('#run').click(run);
          $('#report').click(function () { time.report(); });
          div = $('#test');
          time.setReportMethod(reportMethod);
        });

        function run() {
          for (var i = 0; i < numberOfTypeTests; i++) { testAttr(); }
          for (var i = 0; i < numberOfTypeTests; i++) { testProp(); }
          for (var i = 0; i < numberOfTypeTests; i++) { testConvert(); }
          for (var i = 0; i < numberOfTypeTests; i++) { testGet(); }
          for (var i = 0; i < numberOfTypeTests; i++) { testGetAttribute(); }
          time.report();
        }

        function testAttr() {
          test('d.attr(\'id\')', function (d) { d.attr('id'); });
        }

        function testProp() {
          test('d.prop(\'id\')', function (d) { d.prop('id'); });
        }

        function testConvert() {
          test('d[0].id', function (d) { d[0].id; });
        }

        function testGet() {
          test('d.get(0).id', function (d) { d.get(0).id; });
        }

        function testGetAttribute() {
          test('d[0].getAttribute(\'id\')', function (d) { d[0].getAttribute('id'); });
        }

        function test(name, f) {
          time.start(name);
          for (var i = 0; i < numberOfIdTests; i++) { f(div); }
          time.stop(name);
        }

      function reportMethod(t) {
        var report = '';
        for (var i = 0; i < t.length / numberOfTypeTests ; i++) { // Type test
          var total = 0.0;
          for (var j = 0; j < numberOfTypeTests; j++) {
            total += t[i * numberOfTypeTests + j].delta;
          }
          var avg = Math.round(total / numberOfTypeTests);
          report += t[i * numberOfTypeTests].name + ': ' + avg + 'ms<br />';
        }
        $('#output').html(report);
      }
      </script>
    </head>
    <body>
      <button id="run">Run tests</button>
      <div id="test"></div>
      <div id="output"></div>
    </body>
    </html>
