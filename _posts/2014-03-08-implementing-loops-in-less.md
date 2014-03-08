---
layout      : post
title       : Implementing loops in LESS
tags        : [CSS, LESS]
preview     : /images/2014/03/08/logo.png
socialimage : /images/2014/03/08/logo.png
primarytag  : LESS
intro       : This article looks at how to implement for loops in LESS, which is harder than it would seem unfortunately.
---

{% include post-image.html class="right-col" alt="LESS logo" src="/images/2014/03/08/logo.png" %}

The LESS pre-processor doesn't actually have a for loop, or even a while loop. Instead it has the ability to simulate them with a feature called [*guard expressions*][1], which is a mixin that will only execute if a given condition passes.

<div class="clear"></div>

<!--prettify lang=css-->
    .optional-style(@switch) when (@switch) {
      color: black;
    }

    button {
      /* Add optional styles */
      @switch: true;
      .optional-style(@switch);
    }

    li {
      /* Don't add optional styles */
      @switch: false;
      .optional-style(@switch);
    }

A for loop can be simulated by using a guard expression that calls itself with the loop index decremented.

<!--prettify lang=css-->
    .my-loop(@i) when (@i > 0) {
      .my-loop(@i - 1);
      li:nth-child(@{i}) {
        color:red;
      }
    }

    /* Run the loop */
    .my-loop(5);

    /* Produces li:nth-child(1) ... li:nth-child(5) */

To reverse the order in which the loop is evaluated, place the recursive call at the other end of the guard expression.

<!--prettify lang=css-->
    .my-loop(@i) when (@i > 0) {
      li:nth-child(@{i}) {
        color:red;
      }
      .my-loop(@i - 1);
    }

    /* Run the loop */
    .my-loop(5);

    /* Produces li:nth-child(5) ... li:nth-child(1) */



[1]: http://lesscss.org/features/#css-guards-feature