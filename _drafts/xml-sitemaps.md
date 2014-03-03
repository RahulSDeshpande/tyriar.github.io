---
layout      : post
title       : XML sitemaps in Jekyll
tags        : [GitHub, Jekyll, SEO]
preview     : 
socialimage : 
primarytag  : Jekyll
intro       : This post explains the what XML sitemaps are, why they're useful and how to build one.
---

## What are they?

An [XML sitemap][4] is a file that helps better inform search engines on how to crawl and index a web site. Google, Yahoo! and Bind recommend the use of an XML sitemap to improve crawling.

This article looks at the current version of the [sitemap protocol][5], 0.90.

## Why they're useful?

Search engines will naturally crawl a web site and index its pages. The main benefits in a formal sitemap is to provide additional metadata on each URL.

The primary value add is in the ability to specify a priority against a URL. This **will not** change the search rankings of the pages against external sites, it does however use this information to rank the importance of pages internally. For example on my blog I use the lowest priority for index pages past the first one ([`/page2/index.html`][1] and so on), my shorter posts are in the middle while [home][2] and [top articles][3] are the highest. This ensures the the best quality, most relevant articles will be presented highest in search results.

Other information like the change frequency can be modified 



[1]: {{ site.baseurl }}/page2/index.html
[2]: {{ site.baseurl }}
[3]: {{ site.baseurl }}/p/top-articles.html
[4]: http://www.sitemaps.org/
[5]: http://www.sitemaps.org/protocol.html