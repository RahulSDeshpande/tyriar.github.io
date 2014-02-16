---
layout      : post
title       : Triangles in CSS
tags        : [CSS, Design, HTML, SASS]
socialimage : /images/2013/03/11/triangle2.png
primarytag  : CSS
intro       : Creating triangles with CSS is a pretty good way to reduce the amount of image dependencies within an application. They're a bit tricky to get your head around at first but once you understand them it's really easy.
---

## Drawing a triangle

Lets say we are constructing a triangle to use as an up arrow, the first thing to do is to create an element with a size of 0x0. A bottom border is then applied to element with the colour set to the colour you want the triangle to be. Then we add left and right borders to the element with the colour of transparent.

<!--prettify lang=css-->
    .triangle {
        border-bottom:15px solid #000;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        width:0;
        height:0;
    }

This is what we are given:

{% include post-image.html class="center-aligned" alt="Result" src="/images/2013/03/11/triangle1.png" %}

Why it came out in this shape? The below diagram explains the dimensions, note that `15px` was used for the bottom border and `10px` was used for left and right.

{% include post-image.html class="center-aligned" alt="Diagram" src="/images/2013/03/11/triangle2.png" %}

It's pretty easy to make a right-angle triangle also by removing the right border.

{% include post-image.html class="center-aligned" alt="Right-angle-triangle" src="/images/2013/03/11/triangle3.png" %}



## Pseudo-elements

Triangles are usually drawn with the pseudo-elements `:before` and `:after` because this way they can be drawn to augment existing elements. A perfect example is this blog's social icons on the sidebar, when hovered they have a little tooltip with an arrow popup.

{% include post-image.html class="center-aligned" alt="Tooltip" src="/images/2013/03/11/social.png" %}

This is done using a pseudo-element to create the arrow and then using `position:absolute` to position the triangle in the correct spot.

To get the pseudo-elements to work you need to add a few standard rules first so they will show up. These styles will print the original triangle from above but use the `:after` pseudo-element.

<!--prettify lang=css-->
    .triangle:after {
        border-bottom:15px solid #000;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        width:0;
        height:0;

        content:"";
        display:block;
    }

Given this information we can make a text box and position a triangle at the top-left.

<!--prettify lang=html-->
    <div class="popup">Some text in a popup</div>

<!--prettify lang=css-->
    .popup {
        background-color:#7FF;
        position:relative;
        display:inline-block;
        padding:.2em .5em;
    }

    .popup:after {
        border-bottom:10px solid #7FF;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        width:0;
        height:0;

        content:"";
        display:block;
        position:absolute;
        bottom:100%;
        left:1em;
    }

{% include post-image.html class="center-aligned" alt="Popup" src="/images/2013/03/11/popup.png" %}



## Adding a border

Adding a border to the triangle is another handy trick to have in your arsenal. The way to do this is to create a `:before` element which be another triangle that is slightly larger and shifted a little towards the top and left of the element. This shifting can be done with either negative margins or the `left`, `right`, `top`, `bottom` properties.

<!--prettify lang=css-->
    .popup {
        background-color:#7FF;
        position:relative;
        display:inline-block;
        padding:.2em .5em;
        border:2px solid #000;
        z-index:0;
    }

    .popup:after,
    .popup:before {
        width:0;
        height:0;
        content:"";
        display:block;
        position:absolute;
        bottom:100%;
        left:1em;
    }

    .popup:after {
        border-bottom:10px solid #7FF;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        z-index:1;
        margin-top:1px;
    }

    .popup:before {
        border-bottom:13px solid #000;
        border-left:13px solid transparent;
        border-right:13px solid transparent;
        margin-top:-3px;
        margin-left:-3px;
        z-index:-100;
    }

{% include post-image.html class="center-aligned" alt="Border popup" src="/images/2013/03/11/popup2.png" %}



## Examples

Here are some flexible styles for triangles taking advantage of pseudo-elements written in SASS.

{% include codepen.html id="dsJvt" height="279" description="Triangles in CSS" %}