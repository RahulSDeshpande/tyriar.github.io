---
layout      : post
title       : Detecting number of siblings with CSS
tags        : [CSS, LESS, Sass]
primarytag  : CSS
intro       : I came across a clever CSS technique, originally developed by <a href="http://andr3.net/blog/post/142">André Luís</a> in 2009 and later refined by <a href="http://lea.verou.me/2011/01/styling-children-based-on-their-number-with-css3/">Lea Verou</a> 2 years later; applying a style when the number of siblings is a particular number. It's definitely worth knowing.
---

This has a bunch of potential applications, a particularly nice one is styling a series of siblings to fill the width of the container (provided flexbox isn't suitable).

Here is an example that lays out `li` elements using `float:left`.

<!--prettify lang=css-->
    li {
      float: left;
    }

    /* one item */
    li:first-child:nth-last-child(1) {
      width: 100%;
    }

    /* two items */
    li:first-child:nth-last-child(2),
    li:first-child:nth-last-child(2) ~ li {
      width: 50%;
    }

    /* three items */
    li:first-child:nth-last-child(3),
    li:first-child:nth-last-child(3) ~ li {
      width: 33.3333%;
    }

    /* four items */
    li:first-child:nth-last-child(4),
    li:first-child:nth-last-child(4) ~ li {
      width: 25%;
    }

It works by selecting the first child, then the <code>n</code>th last child which will only exist if there is at least <code>n</code> siblings. The order in which the rules are defined ensures that the correct rule(s) are applied to the siblings.

{% include codepen.html id="qxHgE" height="265" description="Detect number of siblings with CSS" %}

This technique can be applied in Sass by using a mixin.

<!--prettify lang=css-->
    @mixin space-out($min, $max) {
      @for $i from $min through $max {
        &:first-child:last-child(#{$i}),
        &:first-child:last-child(#{$i}) ~ & {
          width: 1 / $i * 100%;
        }
      }
    }

    li {
      @include space-out(1, 4);
    }

LESS is a little trickier as [looping][4] isn't as intuitive but it's doable as well.

<!--prettify lang=css-->
    .space-out(@min, @max) {
      .space-out-loop(@i) when (@i > 0) {
        .space-out-loop(@i - 1);
        &:first-child:last-child(@{i}),
        &:first-child:last-child(@{i}) ~ & {
          width: 1 / @i * 100%;
        }
      }
      .space-out-loop(@max);
    }

    li {
      .space-out(1, 4);
    }

[3]: /2013/03/a-clearfix-without-additional-markup.html
[4]: /2014/03/implementing-loops-in-less.html
