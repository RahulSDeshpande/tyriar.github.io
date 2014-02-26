---
layout      : post
title       : Embedding CodePens on a Jekyll site
tags        : [Jekyll, Markdown]
primarytag  : Jekyll
intro       : During <a href="http://www.growingwiththeweb.com/2014/02/redesign-3-from-blogger-to-github-pages.html">my migration</a> to <a href="http://jekyllrb.com/">Jekyll</a> I've found that the markdown parser, Maruku, doesn't compile the current <a href="http://codepen.io/">Codepen</a> embed code.
---

<!--prettify lang=html-->
	<p data-height="268" data-theme-id="0" data-slug-hash="cCyba" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/Tyriar/pen/cCyba'>The <samp> element</a> by Daniel Imms (<a href='http://codepen.io/Tyriar'>@Tyriar</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
	<script async src="//codepen.io/assets/embed/ei.js"></script>

Maruku seems to have a problem parsing Markdown when HTML attributes don't have a value. The issue can be resolved by changing the `script` tag's `async` attribute to `async="async"`.

<!--prettify lang=html-->
    <script async="async" src="//codepen.io/assets/embed/ei.js"></script>
