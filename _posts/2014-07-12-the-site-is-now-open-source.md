---
layout      : post
title       : The site is now open source
tags        : [Blogging, GitHub]
preview     : /images/2014/07/12/github-logo.png
socialimage : /images/2014/07/12/github-logo.png
primarytag  : GitHub
intro       : Growing with the Web is <a href="https://github.com/Tyriar/tyriar.github.io">now open source</a>! I'm releasing the source code as an educational tool to demonstrate how I've set it up.
---

{% include post-image.html class="right-col" alt="GitHub logo" src="/images/2014/07/12/github-logo.png" %}

It's a pretty typical Jekyll blog only with a fair bit of effort put into optimising various parts, study the [grunt file][1] to see the build process I've set up. Here are a few of the things of note that are done to boost performance:

- Minifies all CSS, JS and HTML (including in layouts and includes)
- Both vector and raster images are minified, with raster images maintaining the original copies
- Includes scripts with `async` where possible to reduce render blocking
- Maintains a separate [Sass file][2] which is inlined on the default layout during the build to boost above-the-fold render time

If you see any bugs or content issues on the site it would be great if you could [create an issue][3]!



[1]: https://github.com/Tyriar/tyriar.github.io/blob/master/Gruntfile.js
[2]: https://github.com/Tyriar/tyriar.github.io/blob/master/__sass/inline.scss
[3]: https://github.com/Tyriar/tyriar.github.io/issues/new
