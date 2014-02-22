---
layout      : post
title       : Optimisation and validation tools for web development
tags        : [Accessibility, CSS, Design, HTML, Optimisation, SEO]
preview     : /images/2014/02/22/checks.svg
socialimage : /images/2014/02/22/checks.png
primarytag  : Accessibility
intro       : There is a lot to cover when making a website. So much that it's unreasonable to manually check a site for best practices in <abbr title="Search Engine Optimisation">SEO</abbr>, performance, accessibility, style and so on. Luckily the internet has you covered with these great tools to push your site to the next level!
---

{% include post-image.html class="right-col" alt="A checklist" src="/images/2014/02/22/checks.svg" %}

This article presents several of those tools that I've found the most useful. Many have overlapping functionality but it's great to get multiple opinions about the state of your site.



## Accessibility

Accessibility is a big deal on the internet that is unfortunately often overlooked. An accessible website will not only widen your audience by catering to the disabled through the use of assistive technology, but it also allows a website to be presented in many other different forms that are useful to *everyone*.

- [**W3C Markup Validation Service**][16] checks a page for conformance against the HTML specification.
- [**W3C Link Checker**][17] scans a website for any links pointing to non-existant pages.
- [**W3C Feed Validation Service**][21] scans and validates a RSS or Atom feed.
- [**W3C mobileOK Checker**][22] performs various tests on a page and its resources to determine its level of mobile friendliness.
- [**W3C Internationalization Checker**][23] checks to see if a page contains any internationalization issues.
- [**Powermapper SortSite**][26] is the most comprehensive accessibility checker I've used, giving a detailed breakdown on [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0][27] conformance errors and warnings.
- [**WAVE Web Accessibility Evaluation Tool**][24] by [WebAIM][25] scans a page and provides a series of inline accessibility errors and warnings.



## Design

These tools help with the validation of a site's design.

- [**Viewport Resizer**][18] is a bookmarklet from [Malte Wassermann][19] helpful in approximating how a page will display on different devices by wrapping a page in a resizeable container.
- [**W3C CSS Validation Service**][20] scans a CSS file and provides a series of warnings and conformance errors.



## Performance

Achieving great performance is about pushing page-weight down as much as possible and optimising the above-the-fold content in order to improve the user experience. Above-the-fold loading performance is typically measured using [speed index][2].

- [**PageSpeed Insights**][1] from Google scans a pages and gives some high-level advice for optimising it on desktop and mobile.
- [**Web Page Test**][9] is an [open source project][10] primarily supported by Google that runs a web page on a remote computer and provides in depth details on connections, requests, page size and speed index for both the non-cached first time load and cached repeated loads.
- [**CSS Stats**][6] is an [open source project][8] from [Adam Morse][7] that provides some unique insight into all the CSS used on a page, such as how many times a selector is used, all font sizes or colors on a page and so on. A clever web developer could use this to push down the size of their CSS file by merging selectors or cutting ones that shouldn't be there in the first place.
- [**DOM monster**][11] is an [open source][12] bookmarklet from [Thomas Fuchs][13] that analyses the DOM of a page and gives some stats and a list of tips and warnings to improve the overall page weight.



## <abbr title="Search Engine Optimisation">SEO</abbr>

These <abbr title="Search Engine Optimisation">SEO</abbr> tools will help resolve some issues that search engines may not like about your website.

- [**Feed the bot**][3] from [Patrick Sexton][4] focuses on meeting the [Google webmaster guidelines][5].
- [**Quick Sprout**][14] from [Neil Patel][15] is a tool that focused on boosting traffic on a page by analysing its SEO, Speed and social status practices and providing recommendations. A paid option is available that can analyse an entire domain.



[1]: http://developers.google.com/speed/pagespeed/insights/
[2]: https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index
[3]: http://www.feedthebot.com/
[4]: https://plus.google.com/+PatrickSexton
[5]: https://support.google.com/webmasters/answer/35769
[6]: http://www.cssstats.com/
[7]: http://mrmrs.cc/
[8]: https://github.com/mrmrs/cssstats/
[9]: http://www.webpagetest.org/
[10]: https://github.com/WPO-Foundation/webpagetest
[11]: http://mir.aculo.us/dom-monster/
[12]: https://github.com/madrobby/dom-monster
[13]: http://mir.aculo.us/
[14]: http://www.quicksprout.com/
[15]: https://twitter.com/neilpatel
[16]: http://validator.w3.org/
[17]: http://validator.w3.org/checklink
[18]: http://lab.maltewassermann.com/viewport-resizer/
[19]: https://twitter.com/MalteWassermann
[20]: http://jigsaw.w3.org/css-validator/
[21]: http://validator.w3.org/feed/
[22]: http://validator.w3.org/mobile/
[23]: http://validator.w3.org/i18n-checker/
[24]: http://wave.webaim.org/
[25]: http://webaim.org/
[26]: http://www.powermapper.com/products/sortsite/checks/accessibility-checks.htm
[27]: http://www.w3.org/TR/WCAG20/