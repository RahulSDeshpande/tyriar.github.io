---
layout      : post
title       : Creating a 'trail' effect in canvas
tags        : [Canvas, JavaScript]
primarytag  : JavaScript
intro       : I put together a CodePen demonstrating a method for creating a 'trail' effect using canvas. The method involves drawing a slightly transparent rectangle over the canvas every time the program loops. This creates the fading gradient effect.
---

{% include codepen.html id="BfizE" height="255" description="Simple canvas trail effect" %}

This is a snippet of the loop, the important part.

<!--prettify lang=js-->
    function loop() {
      updatePosition();

      // Draw over the whole canvas to create the trail effect
      context.fillStyle = 'rgba(255, 255, 255, .05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the dot
      context.beginPath();
      context.fillStyle = '#ff0000';
      context.moveTo(dot.x, dot.y);
      context.arc(dot.x, dot.y, 3, 0, Math.PI*2, true);
      context.fill();
    }
