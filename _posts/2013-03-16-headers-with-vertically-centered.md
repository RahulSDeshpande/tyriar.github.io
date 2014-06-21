---
layout      : post
title       : Headers with a vertically-centered horizontal line
tags        : [Blogging]
socialimage : /images/2013/03/16/headings.png
primarytag  : Blogging
gpluspost   : JtBoQKbw2Vw
intro       : "Here's a pretty good method of creating a header that has a vertically-centered, horizontal line on the right-hand side of the header. There are a couple of caveats though: it requires a little JavaScript to set an attribute on the headings; and it cannot be used on tiled backgrounds."
---

{% include post-image.html class="center-aligned" alt="Headings" src="/images/2013/03/16/headings.png" %}



## Layers

The heading is made up of three layers, the base element and the `:before` and `:after` pseudo-elements.

### Bottom layer

The bottom layer (`:after`) is a horizontal line as wide as the heading block element. It is positioned absolutely on the heading element.

{% include post-image.html class="center-aligned" alt="BOttom layer" src="/images/2013/03/16/bottom.png" %}

<!--prettify lang=css-->
    h1:after, h2:after, h3:after, h4:after, h5:after, h6:after {
        /* position the element */
        position:absolute;
        content:'';
        display: block;
        left:0;
        right:0;
        top:50%;

        /* draw the line */
        background-color:#555;
        height:.1em;

        /* ensure the line is visible in case .1em < 1px */
        min-height:1px;

        /* make bottom layer */
        z-index:-2;
    }

### Middle layer

The middle layer (`:before`) is a white rectangle that displays the words again in order to simulate the length of the heading, this covers the horizontal line behind the words. It is also positioned absolutely on the heading element.

{% include post-image.html class="center-aligned" alt="Middle layer" src="/images/2013/03/16/middle.png" %}

<!--prettify lang=css-->
    h1:before, h2:before, h3:before, h4:before, h5:before, h6:before {
        /* position the element */
        position: absolute;
        display:block;
        top:0;
        left:0;
        bottom:0;

        /* get the same width as the heading */
        content: attr(data-content);

        /* solid white rectangle */
        background-color:#FFF;
        color:#FFF;

        /* make middle layer */
        z-index:-1;

        /* allow some space between the heading and the line */
        padding-right:.5em;
    }

### Top layer

The top layer is the regular heading.

{% include post-image.html class="center-aligned" alt="Top layer" src="/images/2013/03/16/top.png" %}

<!--prettify lang=css-->
    h1, h2, h3, h4, h5, h6 {
        /* for position:absolute on :before and :after */
        position:relative;
    }

## Full example

{% include codepen.html id="duDvC" height="330" description="Headers with a vertically-centered horizontal line" %}



[Headings]: https://googledrive.com/host/0B-wUQaw640vCdGJvd1hWLWpOcm8/headings.png
[Bottom line]: https://googledrive.com/host/0B-wUQaw640vCdGJvd1hWLWpOcm8/bottom.png
[Middle line]: https://googledrive.com/host/0B-wUQaw640vCdGJvd1hWLWpOcm8/middle.png
[Top layer]: https://googledrive.com/host/0B-wUQaw640vCdGJvd1hWLWpOcm8/top.png
