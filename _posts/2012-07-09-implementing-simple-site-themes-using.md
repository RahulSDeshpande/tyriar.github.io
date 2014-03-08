---
layout      : post
title       : Implementing simple site themes using Sass
tags        : [CSS, Sass]
primarytag  : Sass
intro       : <a href="http://www.growingwiththeweb.com/2012/04/sass-syntactically-awesome-stylesheets.html">Sass</a> is awesome, I first discovered it around 9 or so months ago now and have loved it ever since. Recently I implemented an unplanned theme system to a web app and because I was doing the styles in a modular/extendable way thanks to Sass, it was very easy. It took around around 30 minutes to have 8 distinct colour themed stylesheets.
---

The app was originally split up into a structure like this:

- base (folder)
  - \_colors.scss
  - \_fonts.scss
  - \_sizes.scss
- \_includes.scss
- site.scss
- \_&lt;otherareas&gt;.scss

To make the stylesheets I moved the relevant colors from the \_colors.scss file to the new stylesheet (red.scss, green.scss, etc.) and had those file include the old stylesheet (site.scss).

<!--prettify lang=css-->
    $primary-color:#0D58A6;
    $primary-color-hover:#04376C;

    $secondary-color:#FF9900;
    $secondary-color-hover:#A66300;

    @import "_site";
