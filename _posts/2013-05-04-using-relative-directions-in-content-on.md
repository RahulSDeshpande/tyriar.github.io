---
layout      : post
title       : Using relative directions in content on the web
tags        : [Accessibility, CSS, HTML, My projects, Responsive web design]
socialimage : /images/2013/05/04/first.png
primarytag  : Accessibility
gpluspost   : F8L1A7RHpUw
intro       : You've all seen it before, you hit a webpage with a menu on the left and somewhere in the main section it says something like "for more look at the left menu".
---

{% include post-image.html class="full-width" alt="Side by side" src="/images/2013/05/04/first.png" %}

Sure it's fine for the majority of us, but it is pretty bad practice for a couple of accessibility reasons. Firstly there is no concept of left and right for people using assistive technologies like JAWS to read the page for them. Secondly what if your website is responsive in some way or your content appears in different forms like an app or mobile site, you need to ask yourself if it is really left or right in all these cases.

{% include post-image.html class="center-aligned" alt="Stacked" src="/images/2013/05/04/second.png" %}

So how can we solve this problem? The most common way is to just remove the words all together which doesn't really solve the issue as now the majority of the users don't even get the hint as to where the menu is located.

A way to get around the issue for a non-responsive site is to use the `aria-hidden` attribute to hide the content from screen readers coupled with another element that is off screen and only visible to screen readers.

<!--prettify lang=html-->
    <span aria-hidden="true">left</span>
    <span class="screen-reader">above</span>

<!--prettify lang=css-->
    .screen-reader {
      position:absolute;
      left:-9999px;
    }

I've come up with a better solution for the responsive problem in a way which allows both parties to have the hints without compromise. It uses the above `aria-hidden` technique coupled with a listener on `window.resize` that transforms the text in sync with the CSS breakpoint. The best thing is the script handles everything for you, just include the script and decorate your element with a few `data-` attributes.

<!--prettify lang=html-->
    <p>Check out more on the menu <span class="relative-direction" data-breakpoint="600" data-text="above">to the left</span>.</p>

On load this will be transformed to this:

<!--prettify lang=html-->
    <span class="relative-direction" data-breakpoint="600" data-text="above">
        <span aria-hidden="true">to the left</span>
        <span style="position: absolute; left: -9999px;">above</span>
    </span>

The text in the first inner `<span>` is then transformed when the window width drops below (and then above) `600px`.

[Check it out on GitHub][1], [here is a demonstration on GitHub HTML preview][2].

[1]: https://github.com/Tyriar/relative-dir.js
[2]: http://htmlpreview.github.io/?https://github.com/Tyriar/relative-dir.js/blob/master/relative-dir.htm
