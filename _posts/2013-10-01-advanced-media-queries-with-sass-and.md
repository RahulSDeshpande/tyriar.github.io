---
layout      : post
title       : Advanced media queries with Sass and LESS
tags        : [CSS, LESS, Sass]
primarytag  : Sass
gpluspost   : dzV3LgLMJLL
intro       : Sass and LESS both have handy features to allow media queries to be written once and used throughout a project, but both have their own unique was of doing so.
---

Just as a refresher, here is a regular CSS media query. This one applies two styles to `<img>` elements, but only when the browser is in the `screen` category (as opposed to `print`) and the width of the page is less that `15em`s.

<!--prettify lang=css-->
    @media screen and (max-width: 15em) {
      img {
        float:none;
        width:100%;
      }
    }

This becomes very difficult to manage when you start using the same query in multiple places, or worse, when there is more than one type of media query. That's where our trusty pre-processors Sass or LESS come in. Not only do they allow us to write the media queries once and use everywhere, but we can place all of them together in their own isolated file to simplify future refactors.

## Sass

For Sass it's built into the `@mixin` system. Version 3.2.0 brought with it the ability to include a block of content which you place the `@content` directive inside.

**media-queries.scss**

<!--prettify lang=css-->
    @mixin media-mobile {
      @media screen and (max-width: 15em) {
        @content;
      }
    }

**Usage**

<!--prettify lang=css-->
    @include media-mobile {
      img {
        float:none;
        width:100%;
      }
    }

## LESS

LESS' method for reuseable breakpoints actually turns out to be quite a bit nicer to write. You simply assign a variable an 'unquoted' (`~`) string and use `@media` and then the variable just like a regular media query.

**media-breakpoints.less**

<!--prettify lang=css-->
    @mobile-breakpoint: ~"screen and (max-width: 15em);"

**Usage**

<!--prettify lang=css-->
    @media @mobile-breakpoint {
      img {
        float:none;
        width:100%;
      }
    }
