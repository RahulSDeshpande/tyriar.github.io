---
layout      : post
title       : My experiences upgrading from Maruku to Kramdown
tags        : [GitHub, Jekyll, Markdown]
preview     : /images/07/01/logo.png
socialimage : /images/07/01/logo.png
primarytag  : Jekyll
intro       : Recently GitHub Pages <a href="https://help.github.com/articles/migrating-your-pages-site-from-maruku">migrated off</a> the <a href="https://github.com/bhollis/maruku/">Maruku markdown parser</a> to <a href="https://github.com/gettalong/kramdown">Kramdown</a> and deprecated support for Maruku moving forward. While some documentation was provided, it didn't really cover some of the specific differences between the interpreters. This post covers all the issues I experienced during this transition.
---

| Issue | Maruku | Kramdown
|-------|--------|----------
| Asterisks have looser rules around when they're used for italics and bold. | `1000*60*60` | `1000\*60\*60`
| Tables are created if a pipe character exists on the line in Kramdown, it doesn't even need to be at the start of the line. You will need to escape the character or use the HTML entity to get a pipe character in Kramdown, unfortunately neither option seems to work with MathJAX though. | `the | symbol` | `the \| symbol`
| The order of some tags don't work, `<samp>` was acting up for me in Kramdown. | `<samp><pre>...</pre></samp>` | `<pre><samp>...</samp></pre>`
