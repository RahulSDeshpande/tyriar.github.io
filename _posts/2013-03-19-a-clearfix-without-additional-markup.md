---
layout      : post
title       : A clearfix without additional markup
tags        : [CSS, HTML]
primarytag  : CSS
intro       : This article introduces a way to clear floats using pseudo-elements on a wrapping element.
---

For a long time we've been forced to clear floats in a manner something like this:

<!--prettify lang=html-->
    <div class="float">a</div>
    <div class="float">b</div>
    <div class="float">c</div>
    <div class="clear"></div>

<!--prettify lang=css-->
    .float {
      float:left;
    }
    .clear {
      clear:both;
    }

Fortunately with the usage of [IE7 declining][1] we can [finally][2] embrace the use of pseudo-elements. There have been a few different clear fixes using pseudo elements popping up around the web over the last few years, this one is my favourite. It is applied to a wrapper around the floated elements by creating a pseudo-element after the wrapper and clearing there.

<!--prettify lang=css-->
    .container:after {
      display: block;
      content: "";
      clear: both;
    }

Here is [an example of it in action][3].

<!--prettify lang=html-->
    <div class="container">
        <div class="float">a</div>
        <div class="float">b</div>
        <div class="float">c</div>
    </div>

<!--prettify lang=css-->
    .float {
      float:left;
    }
    .container:after {
      display: block;
      content: "";
      clear: both;
    }

This method works with IE9, IE10 and the latest versions of Chrome, Opera, Firefox and Safari.

[1]: http://gs.statcounter.com/#browser_version-AU-monthly-201303-201303-bar
[2]: http://caniuse.com/#search=pseudo-elements
[3]: http://jsfiddle.net/Tyriar/fJfDq/
