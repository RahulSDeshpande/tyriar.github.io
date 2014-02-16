---
layout      : post
title       : How to center a block using CSS
tags        : [CSS, HTML]
primarytag  : CSS
intro       : I'm always surprised at how many people I've worked with that don't know how to do this. To center a block vertically and horizontally apply the following CSS.
---

<!--prettify lang=css-->
    position:fixed;
    top:50%;
    left:50%;
    width:200px;
    height:150px;
    margin-top:-75px; /* negative half height */
    margin-left:-100px; /* negative half width */

This is creating a block with a width and height, positioning it in the center of the screen and then offsetting it by half of the width and the height.

An important note here is to be careful when you use padding on this block due to Internet Explorer handling it differently. It is better to make another block inside this one and apply a margin or padding to that.

<!--prettify lang=html-->
    <html>
    <head>
      <style>
        #centered
        {
          position:fixed;
          top:50%;
          left:50%;
          width:200px;
          height:150px;
          margin-top:-75px; /* negative half height */
          margin-left:-100px; /* negative half width */
         
          border:1px #000 solid;
        }
        #centered > .inner
        {
          padding:20px;
          line-height:110px; /* vertically center text */
          text-align:center;
        }
      </style>
    </head>
    <body>
      <div id="centered">
        <div class="inner">Center me</div>
      </div>
    </body>
    </html>