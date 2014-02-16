---
layout      : post
title       : Using the HTML5 date picker with backwards compatibility
tags        : [HTML, jQuery]
socialimage : /images/2012/08/31/date-picker.png
primarytag  : jQuery
intro       : If you didn't know, HTML5 introduced a new input type 'date' which allows the client to support it natively.
---

Here is the native date picker in Chrome 21.

{% include post-image.html class="center-aligned" alt="Date picker" src="/images/2012/08/31/date-picker.png" %}

The following script uses jQuery and Modernizr to check if the input type date is not supported, if they are not it enables jQueryUI date pickers on all `input[type=date]` elements on the page. You could replace the insides of the if statement to whatever library or alternative you want.

<!--prettify lang=js-->
    $().ready(function () {
      if (!Modernizr.inputtypes.date) {
        $.datepicker.setDefaults({
          dateFormat: "dd/m/yy"
        });
        $('input[type=date]').datepicker();
      }
    });



## Libraries

- [Modernizr][1]
- [jQuery][2]
- [jQueryUI][3]



[1]: http://modernizr.com/
[2]: http://jquery.com
[3]: http://jqueryui.com