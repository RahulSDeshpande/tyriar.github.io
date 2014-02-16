---
layout      : post
title       : What is a CSS reset?
tags        : [CSS]
primarytag  : CSS
intro       : A CSS reset is a chunk of CSS that attempts to "reset" all styles so that a web developer can start with a plain canvas that is consistent across browsers. Having all styles uniform including heading tags makes the web site much easier and nicer to style.
---

## Where does it go?

A CSS reset should always be the first stylesheet linked to on a web page. The reason for this is due to the order in which styles are overridden, if there are two styles for `h1` then the second will take precedence unless the first contains the `!important` directive.



## Visual example
Here is some plain HTML page which has not been styled at all.

{% include post-image.html class="center-aligned" alt="No CSS reset" src="/images/2012/07/04/noreset.png" %}

And here is the same HTML page with a CSS reset applied, as you can see all the formatting is gone.

{% include post-image.html class="center-aligned" alt="CSS reset" src="/images/2012/07/04/reset.png" %}




## Stylesheet

Here is an example CSS reset taken from [meyerweb.com/eric/tools/css/reset/][1], there are many others easily accessible on the web.

<!--prettify lang=css-->
    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
     display: block;
    }
    body {
     line-height: 1;
    }
    ol, ul {
     list-style: none;
    }
    blockquote, q {
     quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
     content: '';
     content: none;
    }
    table {
     border-collapse: collapse;
     border-spacing: 0;
    }



[1]: http://meyerweb.com/eric/tools/css/reset/