---
layout      : post
title       : Let me pinch-to-zoom your responsive site
tags        : [Accessibility, Android, HTML, Responsive web design]
primarytag  : Responsive web design
intro       : When I was doing my latest <a href="/2013/01/blog-redesign-2.html">redesign of the blog</a>, I came to the point where I needed to implement the viewport meta tag so the design would scale correctly on different devices.
---

After a little research I discovered several tutorials that said to use this:

<!--prettify lang=html-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no" />

I had a think about the `user-scalable` attribute, which so many tutorials seem to include. What it does is disables pinch-to-zoom on mobile devices, and I couldn't come up with a reason for RWD tutorials to include it. Really there is no reason why we should be disabling pinch-to-zoom on a responsive site, unless zooming would break the app itself. The ability to zoom in on images, text, links, etc. is really handy and I use it all the time. Disabling it introduces potential usability/accessibility issue, so please in the future if you can, omit the `user-scalable=no` value.

<!--prettify lang=html-->
    <!-- much better -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1" />
    
