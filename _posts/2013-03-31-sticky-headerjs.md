---
layout      : post
title       : sticky-header-js
tags        : [HTML, JavaScript, jQuery, My projects, Stack Exchange]
socialimage : /images/2013/03/31/demo.png
primarytag  : JavaScript
intro       : I wrote up a little JavaScript plugin over the weekend that has a <code>&lt;table&gt;</code>'s header scroll with the page. What sparked this little endeavour was a question asking for this functionality on <a href="http://stackoverflow.com/a/15687269/1156119">Stack Overflow</a>. Since it was fun answering the question, I thought I'd go ahead and make a more general plugin type solution that worked for multiple tables.
---

{% include post-image.html class="right-col" alt="Demonstration" src="/images/2013/03/31/demo.png" %}

Similar to my [sortable-table.js][2] plugin, simply add the `sticky-header` class to a `<table>` and the functionality will be enabled.

<div class="clear"><!----></div>

<!--prettify lang=html-->
    <table class="sticky-header">
      ....
    </table>

I've tested it in all the latest browsers and seems to work fine; Chrome, Firefox, Safari, Opera, IE10, IE9 and IE8. No IE7 because it doesn't implement `querySelectorAll`, the code would be a bit more icky if I used some other method, and you know, it's IE7.

[Here is a demonstration on GitHub HTML preview][3], and be sure to [check it out on GitHub][4]!



[2]: {{site.baseurl}}/2012/06/easy-sortable-html-tables-using-jquery.html
[3]: http://htmlpreview.github.com/?https://github.com/Tyriar/sticky-header.js/blob/master/demo.htm
[4]: https://github.com/Tyriar/sticky-header.js
