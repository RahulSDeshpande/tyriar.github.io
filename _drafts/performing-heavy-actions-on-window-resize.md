---
layout      : post
title       : Performing heavy actions on the window resize event
tags        : [JavaScript]
primarytag  : JavaScript
intro       : 
---

[Demo](http://jsfiddle.net/P9Yqf/)


<!--prettify lang=javascript-->
    var resizeTimeout;

    window.onresize = function () {
        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(resizeHandler, 300);
    }

    function resizeHandler() {
        alert('Resized');
    }
