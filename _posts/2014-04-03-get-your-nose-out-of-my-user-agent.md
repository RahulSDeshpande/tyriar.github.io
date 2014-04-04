---
layout      : post
title       : Get your nose out of my user agent
tags        : [Browser, HTML]
socialimage : /images/2014/04/03/i-am-your-browser.png
primarytag  : HTML
intro       : Seriously, stop sniffing user agents. It's hurting web compatibility and causing headaches for both users and browser vendors. Here's why and what you should be doing instead.
draft : 1
---

## What's the problem?

To start off, let's look at what user agents are. The purpose of a user agent is to inform entities external to the browser, what browser, version and platform are accessing a web page. To give one of the purest possible examples, here is Netscape 3's user agent:

    Mozilla/3.0 (Win95; I)

Things have changed a lot (for the worse) since then, have a look at Chrome's current user agent under Windows.

    Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36

So why would a string whose purpose is to identify itself as Chrome mention anything about Mozilla or Safari? Because web developers started using this information to deliver the "best experience" for that browser.

{% include post-image.html class="stretch center-aligned" alt="Hi, I'm Chrome, Firefox and Safari, and I'll be serving your content today" src="/images/2014/04/03/i-am-your-browser.png" %}

While there may not have been better alternatives back then, it turned out to be toxic behaviour that wasn't very forward thinking. It is now common practice for developers to use user agents to serve customised experiences for particular browsers. The problem is that not everyone uses the major browsers that you test for. What about the person browsing on their Xbox or PS4? What about the person using a lesser known browser? What about web crawlers and accessibility tools? What about browsers in the future that will become popular?

This not only negatively affects users but also causes issues for browser vendors who were essentially forced to follow this behaviour and pretend to be a popular browser unless they wanted a subpar experience. In some cases it also hurts the experience on the browsers that you optimise for as well because browsers are always updating, enabling newer features.

In fact, Mozilla is included in [nearly every user agent][4] now which is to a point where it essentially has no meaning anymore other than "I want to be compatible with websites that work on Safari too". The same is becoming true for Chrome and Safari as well.

It's a vicious cycle that will continue getting worse and worse until web developers consistently use feature detection instead of relying on the user agent. 



## What's the solution?

### Graceful degredation

Using features that degrade gracefully is another solution to the problem. Where available, these features will just be ignored or skipped if the browser doesn't support them. An example of this is the `transition` property in CSS, which is ignored if the browser doesn't support it, essentially skipping the animation and going to the end state.

<!--prettify lang=css-->
    .shift {
      padding-left: 0;

      /* ignored if not supported */
      transition: padding-left ease .2s;
    }
    
    .shift:hover,
    .shift:focus {
      padding-left: 1em;
    }

### Feature detection

JavaScript feature detection can be used to probe various APIs to check whether features have been implemented properly. This allows enabling/disabling of features based on whether the browser currently supports it, not whether a handful of browsers supported it at the point of development.

<!--prettify lang=js-->
    function isCanvasSupported() {
      // Check that a created <canvas> element has the getContext function
      return !!document.createElement('canvas').getContext;
    }

    if (isCanvasSupported()) {
      // use canvas
    } else {
      // use fallback
    }

[Modernizr][2] is a feature detection library that makes this process easier, it allows for [custom builds][3] so you can save some bytes on features you won't use.

<!--prettify lang=js-->
    if (Modernizr.canvas) {
      // use canvas
    } else {
      // use fallback
    }



## When should user agents be used?

There is one case where you would want to be user agents and that if for analytics. Unfortunately that's another area that has been hurt by the chain of events. It is far more complex now to figure out what browser a user is using. Just have a look at the [source code][0] for the browser detection library [WhichBrowser][1] which attempts to figure out what browser is being used.



## Final thoughts 

So put in your best effort to do it the right way with feature detection, you will be doing the right thing for both your users and browsers. Who knows, maybe one day browsers will be able to switch them back to what they were designed for. 



[0]: https://github.com/NielsLeenheer/WhichBrowser/blob/master/detect.js
[1]: https://github.com/NielsLeenheer/WhichBrowser
[2]: http://modernizr.com/
[3]: http://modernizr.com/download/
[4]: http://www.useragentstring.com/pages/Browserlist/