---
layout      : post
title       : Detecting tap events on touch-enabled devices
tags        : [HTML, JavaScript]
primarytag  : JavaScript
intro       : There are various ways to detect a standard 'tap' gesture in JavaScript, this article presents a few of them.
---

[jQuery Mobile][1] has been able to detect these gestures for a while, I had a short look around and it didn't seem like there were many other portable solutions for detecting a tap, so I created [touchtap-event.js][2], a lightweight library to do the work for you.

It works by listening to several touch events and dispatching a custom `touchtap` event if the positions the touch started and ended on were approximately the same and the time between them was <= 200ms. For the specific use case I had in mind I only wanted the events to be triggered on touch devices, so mouse events won't trigger `touchtap`, this also makes it more consistent with the other `touch*` events.

Here's a usage example:

<!--prettify lang=javascript-->
    var elem = document.querySelector('#some-element');
    elem.addEventListener('touchtap', function (e) {
      console.log(e);
    });

[Check it out of GitHub][2].


[1]: http://api.jquerymobile.com/tap/
[2]: https://github.com/Tyriar/touchtap-event.js
