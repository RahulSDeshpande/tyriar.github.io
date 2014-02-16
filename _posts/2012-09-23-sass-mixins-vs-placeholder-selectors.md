---
layout      : post
title       : SASS mixins vs placeholder selectors
tags        : [CSS, SASS]
primarytag  : SASS
intro       : One of the things that made me fall in love with <a href="http://www.growingwiththeweb.com/2012/04/sass-syntactically-awesome-stylesheets.html">SASS</a> was the ease of including large chunks of CSS very easily using mixins. This happens to also be one of the main criticisms of SASS due to the CSS it results in. Consider the following SASS which applies the IE6/7 hack to enable the use of the then unsupported <code>inline-block</code> to 3 selectors.
---

*I published an updated, more in depth version of this article for [The Sass Way][1]*

<!--prettify lang=css-->
    @mixin inline-block-hack {
      display: inline-block;
      *display: inline;
      zoom: 1;
    }

    .menu-item {
      @include inline-block-hack;
      background-color:#0FF;
    }

    footer li {
      @include inline-block-hack;
      color:#EEE;
    }

    .icon {
      @include inline-block-hack;
      margin:4px;
    }

Which is compiled to...

<!--prettify lang=css-->
    .menu-item {
      display: inline-block;
      *display: inline;
      zoom: 1;
      background-color: #0FF; }

    footer li {
      display: inline-block;
      *display: inline;
      zoom: 1;
      color: #EEE; }

    .icon {
      display: inline-block;
      *display: inline;
      zoom: 1;
      margin: 4px; }

This is obviously not ideal due to redundancies. Recently SASS version 3.2.0 was released which implemented 'placeholder selectors', these allow you to specify a set of rules that don't belong to anything at first but allow us to extend the placeholder much like you would with the regular `@extend` directive. To specify a placeholder selector simply add a `%` sign to the beginning of the selector. When applied to the situation above it we get this SASS code.

<!--prettify lang=css-->
    %inline-block-hack {
      display: inline-block;
      *display: inline;
      zoom: 1;
    }

    .menu-item {
      @extend %inline-block-hack;
      background-color:#0FF;
    }

    footer li {
      @extend %inline-block-hack;
      color:#EEE;
    }

    .icon {
      @extend %inline-block-hack;
      margin:4px;
    }

Which is compiled to...

<!--prettify lang=css-->
    .menu-item, footer li, .icon {
      display: inline-block;
      *display: inline;
      zoom: 1; }

    .menu-item {
      background-color: #0FF; }

    footer li {
      color: #EEE; }

    .icon {
      margin: 4px; }

All the redundancies have been removed due to the way that `@extend` works vs `@include`.

When you're approaching a CSS problem that can be solved with mixins, I highly recommend you think about whether a placeholder selector can be used to create a better solution to the problem. **You should never write a parameter-less mixin again.**



[1]: http://thesassway.com/intermediate/understanding-placeholder-selectors