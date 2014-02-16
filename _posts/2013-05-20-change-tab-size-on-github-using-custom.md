---
layout      : post
title       : Change the tab size on GitHub using a custom style extension
tags        : [CSS, GitHub]
primarytag  : GitHub
intro       : As far as I'm aware you can't change the tab size on <a href="https://github.com/">GitHub</a> when viewing code on the web interface (yet). While I'm sure this feature will eventually be added, in the meantime it kind of sucks to write your code using 4 character tabs and then having it mangled up when viewing on the web UI.
---

{% include post-image.html class="full-width" alt="Before" src="/images/2013/05/20/before.png" %}

But don't despair, there is a fairly easy fix. We can use the tab-size CSS property to define the tab size on the page.

<!--prettify lang=css-->
    pre {
      tab-size: 4
    }

All we need is some way of injecting it in to the page. [StyleBot][2] for Chrome accomplishes this task very nicely, with a handsome, easy to use UI to boot.

{% include post-image.html class="full-width" alt="StyleBot" src="/images/2013/05/20/stylebot.png" %}

Just enter in the style against the URL [https://github.com][1] and you'll be viewing your code in the correct style in no time. [`tab-size`][3] should work in all major desktop browsers except (surprise) IE. Similar extensions should be available for other browsers.

{% include post-image.html class="full-width" alt="After" src="/images/2013/05/20/after.png" %}

[1]: https://github.com/
[2]: https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size