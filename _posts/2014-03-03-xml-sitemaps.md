---
layout      : post
title       : XML sitemaps
tags        : [Accessibility, HTML, SEO, XML]
preview     : /images/2014/03/03/sitemap.svg
socialimage : /images/2014/03/03/sitemap.png
primarytag  : SEO
intro       : This post explains what XML sitemaps are, why they're useful and how to make one.
---

{% include post-image.html class="right-col" alt="A collection of linked nodes" src="/images/2014/03/03/sitemap.svg" %}

## What is an XML sitemap?

An [XML sitemap][4] is a file that helps better inform search engines about how to crawl and index a web site. Google, Yahoo! and Bing all recommend the use of an XML sitemap to improve crawling.

This article looks at the current version of the [sitemap protocol][5], 0.90.



## Why are they useful?

Search engines will naturally crawl a web site and index its pages, but it's difficult for search engines to guess everything about a particular page. Providing a formal XML sitemap helps define these details that machines can't easily determine.

The primary value add is in the ability to specify a priority against a URL. This **will not** change the search rankings of the pages against external sites, it does however use this information to rank the importance of pages internally. For example on my blog I use the lowest priority for [index pages past the first one][1], my shorter posts are in the middle while [home][2] and [top articles][3] are the highest. This ensures that the best quality, most relevant articles will be presented higher in search results than the lesser ranked pages.

A URL's approximate change frequency and last modified date can also be specified. These are just hints though and may not increase or reduce the frequency in which a page is crawled.

The sitemap protocol also supports splitting a sitemap up into multiple sitemaps, with a single 'master' sitemap pointing to each of the sub-sitemaps.



## Then what about HTML sitemaps?

Just because you have an XML sitemap does not mean that you shouldn't have a HTML sitemap too since they're targetted at different audiences; XML sitemaps are for web crawlers and HTML sitemaps are for users. [HTML sitemaps][8] provide an overview of the entire site, help users understand how the content is organised and provide an alternative way to navigate it. This can help fulfill <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0 Level AA:

> **2.4.5 Multiple Ways:** More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process. (Level AA)
>
> [<cite><abbr title="World Wide Web Consortium">W3C</abbr></cite> - WCAG 2.0][9]



## XML tag definitions

### XML sitemap

| Attribute      | Description
|----------------|------------
| `<urlset>`     | *Required* - Wrapping element that references the current protocol.
| `<url>`        | *Required* - Parent tag for each URL entry.
| `<loc>`        | *Required* - URL of the page. It must contain the protocol (such as http) and end with a trailing slash, if your web server requires it. This value must be less than 2,048 characters.
| `<lastmod>`    | *Optional* - Date of last modification of the file. This date should be in W3C Datetime format, such as `YYYY-MM-DD`.
| `<changefreq>` | *Optional* - How frequently the page is likely to change. Valid values are: <ul><li><code>always</code></li><li><code>hourly</code></li><li><code>daily</code></li><li><code>weekly</code></li><li><code>monthly</code></li><li><code>yearly</code></li><li><code>never</code></li></ul>
| `<priority>`   | *Optional* - The priority of this URL relative to other URLs on your site. Valid values range from `0.0` to `1.0` (default `0.5`).

### XML sitemap index

| Attribute        | Description
|------------------|------------
| `<sitemapindex>` | *Required* - Wrapping element containing about all of the sitemaps in the file.
| `<sitemap>`      | *Required* - Parent tag for a sitemap entry.
| `<loc>`          | *Required* - URL of the sitemap. This can be a sitemap, an Atom file, RSS file or simple text file.
| `<lastmod>`      | *Optional* - Identifies the time that the corresponding Sitemap file was modified. This date should be in W3C Datetime format, such as `YYYY-MM-DD`.



## Example

A good example is [Google's own (enormous) sitemap][6]. As a simple example, here is an excerpt from [my sitemap][10]:

<!--prettify lang=xml-->
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Home -->
      <url>
        <loc>http://www.growingwiththeweb.com/index.html</loc>  
        <priority>1.0</priority>
        <changefreq>daily</changefreq>    
      </url>
      <!-- A regular post -->
      <url>
        <loc>http://www.growingwiththeweb.com/2014/03/given-random5-implement-random7.html</loc>  
        <priority>0.5</priority>    
      </url>
      <!-- A 'top' post -->
      <url>
        <loc>http://www.growingwiththeweb.com/2014/02/a-gentle-introduction-to-git.html</loc>
        <priority>1.0</priority>
      </url>
      <!-- An older post index page -->
      <url>
        <loc>http://www.growingwiththeweb.com/page2/index.html</loc> 
        <priority>0.1</priority>
      </url>
    </urlset>

And this is the example sitemap index from the official [sitemap protocol page][7].

<!--prettify lang=xml-->
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>http://www.example.com/sitemap1.xml.gz</loc>
        <lastmod>2004-10-01T18:23:17+00:00</lastmod>
      </sitemap>
      <sitemap>
        <loc>http://www.example.com/sitemap2.xml.gz</loc>
        <lastmod>2005-01-01</lastmod>
      </sitemap>
    </sitemapindex>



[1]: {{ site.baseurl }}/page2/index.html
[2]: {{ site.baseurl }}/
[3]: {{ site.baseurl }}/p/top-articles.html
[4]: http://www.sitemaps.org/
[5]: http://www.sitemaps.org/protocol.html
[6]: http://www.google.com/sitemap.xml
[7]: http://www.sitemaps.org/protocol.html#index
[8]: http://www.w3.org/TR/WCAG20-TECHS/G63
[9]: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-mult-loc
[10]: http://www.growingwiththeweb.com/sitemap.xml