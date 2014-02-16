---
layout      : post
title       : Centering text vertically using CSS
tags        : [CSS, HTML]
primarytag  : CSS
intro       : This is the easiest and best way to center text vertically, simply set the <code>line-height</code> to the same value as <code>height</code>. Remember that in order to modify the <code>height</code> of an element, it needs to be displayed as either a <code>block</code> or <code>inline-block</code>.
---

{% include codepen.html id="yDakt" height="145" description="Vertically centered text" %}

<!--prettify lang=css-->
    div.centered-box
    {
      height:70px;
      line-height:70px;

      border:5px solid #000;
    }