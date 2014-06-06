---
layout      : post
title       : CSS multi-coloured rectangular borders
tags        : [CSS, Design]
socialimage : /images/2013/10/12/plain-desired.png
primarytag  : Design
intro       : The borders in CSS are weighted equally which means if their colours differ, the split between them will be diagonal. This is the reason that <a href="/2013/03/triangles-in-css.html">CSS triangles</a> work the way they do. Say your design wanted a more rectangular border though, where the top and bottom extended all the way out and covered the bottom portion of the left and right borders.
---

{% include post-image.html class="center-aligned" alt="Plain/desired" src="/images/2013/10/12/plain-desired.png" %}

You can do this a couple of ways.

## The easy way

This involves wrapping the container in another container and adding alternating borders on each container.

<!--prettify lang=html-->
    <div class="container-rect-border">
      <div class="inner"></div>
    </div>

<!--prettify lang=css-->
    .container-rect-border {
      border-top:10px solid #C77;
      border-bottom:10px solid #C77;
    }
    .container-rect-border .inner {
      border-left:10px solid #FAA;
      border-right:10px solid #FAA;
    }

## The hard way

Using another container is generally discouraged as it would be adding markup purely for stylistic reasons. Pulling it off with a single container is possible, it requires the use of the `:before` and `:after` pseudo-elements. These will create 'fake' elements before and after our container which will act as our rectangular borders.

<!--prettify lang=html-->
    <div class="pseudo-border"></div>

<!--prettify lang=css-->
    .pseudo-border {
      border-top:10px solid #C77;
      border-bottom:10px solid #C77;
      position:relative;
      /* pad out the left and right to allow room for the border */
      padding:0 10px;
    }
    .pseudo-border:before,
    .pseudo-border:after {
      position:absolute;
      top:0;
      bottom:0;
      width:10px;
      background-color:#FAA;
      display:block;
      content:"";
    }
    .pseudo-border:before {
      left:0;
    }
    .pseudo-border:after {
      right:0;
    }

## Demo

You can see a demonstration of all the borders at [JSFiddle][2].

[2]: http://jsfiddle.net/Tyriar/tCVb8/
