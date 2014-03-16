---
layout      : post
title       : CSS preprocessors are here to stay
tags        : [CSS, LESS, Sass, Stylus]
socialimage : /images/2014/03/16/preprocessors.png
primarytag  : CSS
intro       : CSS preprocessors like LESS, Sass and Stylus have come a long way in the short amount of time they've been around, and they aren't going anywhere. If you haven't looked into them yet, now is as better time as any. Here's why.
---

{% include post-image.html class="stretch full-width" alt="Pre-processor logos" src="/images/2014/03/16/preprocessors.png" %}



## Easy to learn

To simply replace CSS, preprocessors are incredibly simple to learn. In fact the three major preprocessors are actually *supersets* of CSS, meaning valid CSS is valid in the preprocessors.

Other features can then be learned progressively as the need



## Easy to develop

Developing styles in a preprocessor is simply better in every way to plain CSS. No longer do you need to hack away at a single, enormous CSS file containing all the styles in the page, the styles can now be split up into whatever way makes the most sense to the developer.

There are countless features that improve the maintainability of styles, such as:

- **Mixins**, reducing duplication
- **Variables**, defining constant things like values, colours and media queries once that can be used multiple times 
- **Nesting**, providing a more intuitive and structured way to construct selectors
- **Extending** and **loops**, providing another way to reuse styles
- **Functions**, providing convenience functions that can transform values

This is only the tip of the iceberg, certain preprocessors even use considerably different syntax allowing developers to customise their development workflow even more.



## Performance

Just like how compiled code is faster than interpreted code, preprocessors are **compiled** before usage. This puts them into an ideal state for a browser to consume. That means minifying the resulting CSS by stripping things like comments, white-space, unnecessary units and even changing values (eg. `#F00` &rarr; `red`) to squeeze a few more bytes out of the file.



## They can innovate faster

CSS, and web development in general, takes a lot of time to progress because of the standardisation process. Standards need to go through multiple review iterations and then browsers need to actually implement them. This typically takes several years and afterwards only people who use either modern evergreen browsers or that manually update their browsers will get the new features.

While preprocessors can't change the CSS standard, they can effectively 'fix' this problem from a maintenance and syntactic sugar perspective. The creators of the preprocessors are free to add features to the projects without worrying about standardisation because they're living in their defining their own language that will be compiled down to CSS. Plus, the multiple preprocessors available only feed innovation through healthy competition.



## Easy to compile

There are now numerous ways to use CSS preprocessors on your build process, here are a few examples:

- File watching (eg. [`sass --watch`][0], [CodeKit][5], [Prepros][6])
- IDE/editor extensions (eg. [VS][1], [Sublime][2]) 
- Task runners (eg. [Grunt][3], [Gulp][4]) 


[0]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass
[1]: http://visualstudiogallery.msdn.microsoft.com/6ed4c78f-a23e-49ad-b5fd-369af0c2107f
[2]: https://sublime.wbond.net/packages/SassBuilder
[3]: http://gruntjs.com/
[4]: http://gulpjs.com/
[5]: https://incident57.com/codekit/
[6]: http://alphapixels.com/prepros/