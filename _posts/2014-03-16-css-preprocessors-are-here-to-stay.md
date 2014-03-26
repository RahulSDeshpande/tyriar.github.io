---
layout      : post
title       : CSS preprocessors are here to stay
tags        : [CSS, LESS, Sass, Stylus]
socialimage : /images/2014/03/17/preprocessors.png
primarytag  : CSS
intro       : CSS preprocessors like LESS, Sass and Stylus have come a long way in the short period of time they've been around, and they aren't going anywhere. If you haven't looked into them yet, now is as good time as any to get into them! Here's why.
---

{% include post-image.html class="stretch center-aligned" alt="Pre-processor logos" src="/images/2014/03/17/preprocessors.png" %}



## Easy to learn

To simply replace CSS, preprocessors are incredibly simple to learn. In fact the three major preprocessors are actually *supersets* of CSS, meaning valid CSS is valid in the preprocessors (`.scss` syntax for Sass).

Features can then be learned progressively as required.



## Easy to develop

Being supersets of CSS, developing styles in a preprocessor is simply better in every way to plain CSS. No longer do you need to hack away at a single, enormous CSS file containing all the styles in the page, the styles can now be split up into whatever way makes the most sense to the developer.

There are many other features that improve the maintainability of styles as well, such as:

- **Mixins**, reducing duplication
- **Variables**, defining constants like sizes, colours and media queries that can be used multiple times 
- **Nesting**, providing a more intuitive and structured way to construct selectors
- **Extending** and **loops**, providing more ways to reuse styles
- **Functions**, providing convenience functions that can transform values

This is only the tip of the iceberg. Certain preprocessors even have considerably different syntax, allowing developers to customise their development workflow even more.



## Performance

Just like how compiled code is faster than interpreted code, preprocessors are **compiled** before usage, putting them into an ideal state for a browser to consume. That means minifying the resulting CSS by stripping things like comments, white-space, unnecessary units and even changing values to squeeze a few more bytes out of the file (eg. `#F00` &rarr; `red`).



## They can innovate faster

CSS, and web development in general, takes a lot of time to progress because of the standardisation process. Standards need to go through multiple review steps and then browser vendors need to actually implement them. This typically takes several years and afterwards only the people who use either modern evergreen browsers or who manually update their browsers will get the new features.

While preprocessors can't change the CSS standard, they can effectively 'fix' this problem from a maintenance/syntactic sugar perspective. The creators of the preprocessors are free to add features to the projects without worrying about standardisation because they're defining their own language that will be compiled down to CSS. Plus, the multiple preprocessors available only feed innovation through healthy competition.



## Easy to compile

There are now numerous convenient ways to use CSS preprocessors in your build process, here are a few examples:

- File watching (eg. [`sass --watch`][0], [CodeKit][5], [Prepros][6])
- IDE/editor extensions (eg. [VS][1], [Sublime][2]) 
- Task runners (eg. [Grunt][3], [Gulp][4]) 



## Getting started

CSS preprocessors are here to stay, if you work in web development and haven't touched them yet I highly recommend you get into them. The official websites for provide some great documentation and introductory tutorials.

- [LESS][7]
- [Sass][8]
- [Stylus][9]



[0]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass
[1]: http://visualstudiogallery.msdn.microsoft.com/6ed4c78f-a23e-49ad-b5fd-369af0c2107f
[2]: https://sublime.wbond.net/packages/SassBuilder
[3]: http://gruntjs.com/
[4]: http://gulpjs.com/
[5]: https://incident57.com/codekit/
[6]: http://alphapixels.com/prepros/
[7]: http://lesscss.org/
[8]: http://sass-lang.com/
[9]: http://learnboost.github.io/stylus/
