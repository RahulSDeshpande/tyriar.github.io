---
layout      : post
title       : async vs defer attributes
draft       : 1
tags        : [HTML, JavaScript]
primarytag  : JavaScript
intro       : The <a href="http://caniuse.com/#feat=script-async"><code>async</code></a> and <a href="http://caniuse.com/script-defer"><code>defer</code></a> attributes for the <code>&lt;script&gt;</code> element have great support now, so it's time to learn exactly what they do!
---

## Legend

{% include post-image.html class="left-aligned" alt="" src="/images/2014/02/26/legend.svg" %}

<div class="clear"><!----></div>



## `<script>`

Let's start by defining what `<script>` without any attributes does. The HTML file will be parsed until the script file is hit, at that point parsing will stop and a request will be made to fetch the file (if it's external). The script will then be executed before parsing is resumed.

{% include post-image.html class="full-width stretch" alt="" src="/images/2014/02/26/script.svg" %}



## `<script async>`

`async` downloads the file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading.

{% include post-image.html class="full-width stretch" alt="" src="/images/2014/02/26/script-async.svg" %}



## `<script defer>`

`defer` downloads the file during HTML parsing and will only execute it after the parser has completed.

{% include post-image.html class="full-width stretch" alt="" src="/images/2014/02/26/script-defer.svg" %}
