---
layout      : post
title       : Passing parameters to jQuery event handlers
tags        : [JavaScript, jQuery]
primarytag  : jQuery
intro       : Something everyone who works with jQuery should know, how to pass parameters to a jQuery event handler. Pass a data object as the first argument on the event, the contents of the object will be transferred onto the data variable of event.
---

<!--prettify lang=html-->
    <html>
    <head>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

      <script type="text/javascript">
        $().ready(function () {
          $('button#one').click({ text: 'first button' }, handleClick);
          $('button#two').click({ text: 'second button' }, handleClick);
        });

        function handleClick(event) {
          alert('Clicked on the ' + event.data.text);
        }
      </script>

    </head>
    <body>
      <button id="one">button#one</button>
      <button id="two">button#two</button>
    </body>
    </html>