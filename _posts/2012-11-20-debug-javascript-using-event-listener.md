---
layout      : post
title       : Debug JavaScript using event listener breakpoints
tags        : [Chrome, Debugging, JavaScript, Productivity]
primarytag  : JavaScript
intro       : Have you ever started working on a giant project containing many JavaScript files and needed to find out what some random button is doing? A pretty easy way to find out is to enable the mouse click's event listener breakpoint in the Chrome developer tools. This will break execution when you next click on the page allowing you to step into the code seeing exactly what is happening.
---

To set an event breakpoint hit F12 to open the developer tools, go to the Sources tab and check one of the events on the right sidebar.

{% include post-image.html class="center-aligned" alt="Event listener breakpoints" src="/images/2012/11/20/breakpoints.png" %}

Chrome (23) allows you to break on several events in each of the the following event groupings:

- Animation
- Control
- Clipboard
- DOM mutation
- Device
- Keyboard
- Load
- Mouse
- Timer
- Touch
