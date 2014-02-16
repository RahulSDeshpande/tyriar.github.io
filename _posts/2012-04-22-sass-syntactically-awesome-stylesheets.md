---
layout      : post
title       : "SASS: Syntactically Awesome Stylesheets"
tags        : [CSS, HTML, SASS, Visual Studio]
socialimage : /images/2012/04/22/logo.png
primarytag  : SASS
intro       : SASS stands for <a href="http://sass-lang.com/">Syntactically Awesome Stylesheets</a>, yes, I'm quite a fan of the name. It provides us with a much simpler and more elegant way of defining CSS, allowing the creation of more modular and manageable stylesheets. SASS has two flavours; SASS-style and SCSS-style, the basic difference being that SASS-style uses indentation to separate code-blocks instead of curly braces. The examples used in this post will be using the SCSS-style.
---

{% include post-image.html class="right-col" alt="SASS logo" src="/images/2012/04/22/logo.png" %}

Several years ago, I was playing around with CSS thinking how great it would be if CSS was able to define variables. The help it would be just having the ability to define the colours of a site so you don't have random hex values peppered throughout your stylesheet would be huge. This problem is what instantly drew me to SASS.

<div class="clear"><!----></div>



## Variables

Magic numbers and strings are bad, giving those random values names is good. Defining a variable is similar to defining a CSS rule only the rule name starts with a dollar sign. You then use these by putting the variable where you want the value represented:

<!--prettify lang=css-->
    $page-width:970px;
    $theme-color-1:#A34;

    .wrapper {
      width: $page-width;
      $vertical-border: solid 2px $theme-color-1;
      border-left: $vertical-border;
      border-right: $vertical-border;
    }

Is compiled to...

<!--prettify lang=css-->
    .wrapper {
      width: 970px;
      border-left: solid 2px #aa3344;
      border-right: solid 2px #aa3344; }



## Mixins

Mixins are SASS's word for functions, you define a mixin and then include it within a selector. One mixin I've found particularly useful defines an `inline-block` that contains the hack to make it work correctly in IE6.

<!--prettify lang=css-->
    @mixin inline-block-xbrowser {
      display: inline-block;
      zoom: 1;
      *display: inline;
    }

    nav#top-menu li { @include inline-block-xbrowser; }

Is compiled to...

<!--prettify lang=css-->
    nav#top-menu li {
      display: inline-block;
      zoom: 1;
      *display: inline; }

Mixins can also have arguments and optional arguments.

<!--prettify lang=css-->
    @mixin styled-box($border-size, $border-style: solid) {
      border: $border-style $border-size #000;
      background: #CCC;
    }

    button { @include styled-box(2px); }
    code { @include styled-box(1px, dotted); }

Which is compiled to...

<!--prettify lang=css-->
    button {
      border: solid 2px black;
      background: #CCC; }

    code {
      border: dotted 1px black;
      background: #CCC; }



## Importing stylesheets

SASS includes an `@import` directive which allows you to include all contents of a different SASS file into the one using the directive. This allows us to quite easily have a single HTTP request for all styles in the site by including all styles into a single file.

Using this feature you can create a nice modular infrastructure for your website.

<!--prettify lang=css-->
    /* _sizes.scss */
    $header-height:60px;

    /* main.scss */
    @import "base\_sizes";

    header { height:$header-height; }

Which is compiled to...

<!--prettify lang=css-->
    /* main.scss */
    header {
      height: 60px; }

{% include post-image.html class="right-col" alt="Structure" src="/images/2012/04/22/structure.png" %}

The way I normally set my projects out is by having a main.scss file which imports an _includes.scss file (the underscore is a naming standard saying it's a "partial"). The _includes.scss file includes a bunch of other partials from a base directory. I'm fairly happy with the way I have been splitting up the rest of the styles as I work on fairly small projects at home. For larger projects it may be worth looking into SMACSS (Scalable and Modular Architecture for CSS) which has a different approach of how to split things up.



## Other features

### Comments

Personally when writing CSS I very rarely write comments, primarily as they can't be minified. SASS gives you two different types of comments, the regular CSS-style block comment `/* comment */` and also line comments `// comment`. They act differently however, block comments will carry over to the compiled CSS file whereas line comments won't.

### Interpolation

SASS allows us to use string variables as part of the actual rules themselves. I am yet to find a good use for this but it's useful to know the capability is there.

<div class="clear"><!----></div>

<!--prettify lang=css-->
    $side: bottom;

    .wrapper {
      border-#{$side}: solid 1px #000;
    }

### Operations and functions

SASS has a [collection of functions][2] at its disposal, primarily relating to manipulating or extracting values from colours.

### Extending selectors

There is the capability to have a selector extend another selector, this applies all the rules of the selector being extended. To use this, use the `@extend` directive.



## How do I use it?

The official implementation of SASS is coded in Ruby and it is fairly easy to get up and running by installing sass and then watching a file.

<pre><kbd>gem install sass
sass --watch style.scss:style.css</kbd></pre>

I do most of my work in .NET so I use the Visual Studio extension [Web Workbench][3] made by [Mindscape][4]. It's free to use with a $39 pro version also available that provides post-compilation minification.



## Alternatives

The primary alternative to SASS is [LESS][5]. I instantly gravitated more towards SASS due to its syntax being much more similar to regular CSS.



[2]: http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html
[3]: http://www.mindscapehq.com/products/web-workbench
[4]: http://www.mindscapehq.com/
[5]: http://lesscss.org/