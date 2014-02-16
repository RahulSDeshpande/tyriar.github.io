---
layout     : post
title      : How to remove the default Blogger assets
tags       : [Blogging, CSS, Design, HTML, JavaScript, Optimisation]
primarytag : Blogging
intro      : The default <a href="http://www.blogger.com">Blogger</a> assets have plagued me ever since I started to dive deep into the Blogger template to make my design nicer and to drive the page load time down. I discovered recently how to remove them so no requests are made.
---

<em>**WARNING** This is a tutorial designed for expert web developers, following this tutorial can break the template customiser, layout customiser and prevent widgets from being added to your blog. Your blog may also depend on them if you haven't heavily customised the template.</em>

A Blogger template requires several tags in the `<head>` and the editor will refuse to apply the template without them, namely this section.

<!--prettify lang=html-->
    <b:include data='blog' name='all-head-content'/>
    <b:skin>
      <![CDATA[/*
    -----------------------------------------------
    Blogger Template Style
    Name:     Some name
    Designer: Some author
    URL:      Some URL
    ----------------------------------------------- */

    ...A lot of CSS...

      ]]>
    </b:skin>
    <b:template-skin>
      <b:variable default='960px' name='content.width' type='length'/>
      <b:variable default='0' name='main.column.left.width' type='length'/>
      <b:variable default='310px' name='main.column.right.width' type='length'/>

      <![CDATA[

      ...A lot of CSS...

      ]]>
    </b:template-skin>

Unfortunately it isn't just the inline CSS that is adding unwanted weight to the template, the `<b:include>` tag adds a bunch of elements to `<head>` such as the default/widget CSS, favicon, RSS and a few scripts. Since [browsers block on pending external CSS files][1] before painting, this can add a *significant* amount of time to your page load.

Well I finally figured out a bit of a hack to get around all this unwanted markup. Here it is.

<!--prettify lang=html-->
    <style type=&quot;text/css&quot;>/*<style><b:include data='blog' name='all-head-content'/>*/</style>
    <b:skin><![CDATA[]]></b:skin>
    <b:template-skin/>

Basically we remove the CSS from `<b:skin>` and `<b:template-skin>` and then trick the Blogger editor into putting the `<b:include>` element into a CSS comment. It's a little more complicated than it should be because the CSS `<link>` elements seem to be added above the first `<style>` element.

If you follow this method you will still want to include (or replace) several tags that are normally output by the `<b:include>`, here are the ones I kept/replaced:

<!--prettify lang=html-->
    <link href='http://www.growingwiththeweb.com/favicon.ico' rel='icon' type='image/x-icon'/>
    <link rel="alternate" type="application/atom+xml" title="Growing with the Web - Atom" href="http://www.growingwiththeweb.com/feeds/posts/default" />
    <link rel="alternate" type="application/rss+xml" title="Growing with the Web - RSS" href="http://www.growingwiththeweb.com/feeds/posts/default?alt=rss" />

Another useful tag to keep is the `<link rel="canonical">` which tells search engines what the authoritative URL for the page is, stripping out unneeded query strings and the like. We can get this back by either extracting it from the comment or writing our own. Here is a short script I wrote that can be placed at the end of your blog to generate the canonical link.

<!--prettify lang=js-->
    (function () {
      var url = document.location.pathname.replace(/\/\//g, '/');
      if (url.indexOf('/search') == -1)
        url = document.location.origin + url
      else
        url = document.location.href;
      var canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.querySelector('head').appendChild(canonical);
    })();

I managed to shave **nearly a second** off the (uncached) page load time from applying this change, mainly caused by the blocking CSS files.

[1]: https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
