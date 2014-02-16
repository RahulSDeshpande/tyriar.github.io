---
layout      : post
title       : Use prettyprint in the Chrome debugger
tags        : [Chrome, Debugging, JavaScript, Prettyprint, Productivity]
socialimage : /images/2012/10/19/deobfuscate2.png
primarytag  : Chrome
intro       : In version 12 of Chrome they added the ability to de-obfuscate (un-minify?) the JavaScript on the sources tab by right clicking the code area. Today that feature lives on in the "pretty print" feature located at the curly brace icon on the bottom of the debugger.
---

{% include post-image.html class="center-aligned" alt="Deobfuscate" src="/images/2012/10/19/deobfuscate.png" %}

Clicking it results in this:

{% include post-image.html class="center-aligned" alt="Deobfuscate 2" src="/images/2012/10/19/deobfuscate2.png" %}

This feature not only makes the code more human-readable but also allows us to set breakpoints anywhere, allowing debugging on minified code.
