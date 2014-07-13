---
layout      : post
title       : Detecting tap events on touch-enabled devices
tags        : [HTML, JavaScript]
primarytag  : JavaScript
intro       : There are various ways to detect a standard 'tap' gesture in JavaScript, this article presents a few of them.
---

[jQuery Mobile][1] has been able to detect these gestures for a while, [tap.js][3] is also available which handles both mouse clicks and tap events with the same event. I needed this functionality for one of the libraries I'm building only I didn't want the mouse to trigger the event, so I created [touchtap-event.js][2], a lightweight library that does just that.

It dispatches a custom `touchtap` event if the positions where the touch started and ended were approximately the same and the time between them was <= 200ms. I've named the event `touchtap` to make it distinct from `tap` in [tap.js][3] and also to make it more consistent with the other `touch*` events.

Here's a usage example:

<!--prettify lang=javascript-->
    var elem = document.querySelector('#some-element');
    elem.addEventListener('touchtap', function (e) {
      console.log(e);
    });

[Check it out of GitHub][2].


  [1]: http://api.jquerymobile.com/tap/
  [2]: https://github.com/Tyriar/touchtap-event.js
  [3]: https://github.com/alexgibson/tap.js
