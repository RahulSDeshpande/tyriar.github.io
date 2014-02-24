---
layout      : post
title       : Atom feed templates in Jekyll
tags        : [GitHub, Jekyll]
preview     : /images/2014/02/24/logo.png
socialimage : /images/2014/02/24/logo.png
primarytag  : Jekyll
intro       : This post presents the basic Liquid template and customisations I use for my <a href="http://jekyllrb.com/">Jekyll</a> blog's Atom feed.
---

{% include post-image.html class="right-col" alt="Jekyll logo" src="/images/2014/02/24/logo.png" %}

The feed's location in the site doesn't matter too much but it will need to be linked in your `default.html` layout file.

<div class="clear"><!----></div>

<!--prettify lang=xml-->
<pre><code>&lt;link href='<mark>home_url</mark>/site.atom' rel='alternate' title='<mark>site_title</mark> - Atom' type='application/atom+xml'&gt;</code></pre>



## Basic template

Parts that need to be modified to suit the site are <mark>marked</mark> with explainations in the variables section below.

<!--prettify lang=xml-->
<pre><code>{% raw %}---
layout: nil
---
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;feed xmlns="http://www.w3.org/2005/Atom"&gt;
  &lt;title type="text" xml:lang="en"&gt;<mark>site_title</mark>&lt;/title&gt;
  &lt;link type="application/atom+xml" href="<mark>atom_feed_url</mark>" rel="self"/&gt;
  &lt;link type="text/html" href="<mark>home_url_canonical</mark>" rel="alternate"/&gt;
  &lt;updated&gt;{{ site.time | date_to_xmlschema }}&lt;/updated&gt;
  &lt;id&gt;<mark>unique_feed_identifier</mark>&lt;/id&gt;
  &lt;author&gt;
    &lt;name&gt;<mark>author_name</mark>&lt;/name&gt;
  &lt;/author&gt;
  &lt;rights&gt;<mark>copyright_details</mark>&lt;/rights&gt;

  {% for post in site.posts limit:20 %}
  &lt;entry&gt;
    &lt;title&gt;{{ post.title }}&lt;/title&gt;
    &lt;link href="<mark>home_url</mark>{{ post.url }}"/&gt;
    &lt;updated&gt;{{ post.date | date_to_xmlschema }}&lt;/updated&gt;
    &lt;id&gt;<mark>home_url</mark>{{ post.id }}&lt;/id&gt;
    &lt;content type="html"&gt;{{ post.content | xml_escape }}&lt;/content&gt;
  &lt;/entry&gt;
  {% endfor %}
&lt;/feed&gt;{% endraw %}</code></pre>



## Variables

| Variable                 | Description                                                       | Example
|--------------------------|-------------------------------------------------------------------|--------
| `atom_feed_url`          | Fully qualified atom feed URL                                     | `http://www.growingwiththeweb.com/site.atom`
| `author_name`            | The primary author/company of the site                            | `Daniel Imms`
| `copyright_details`      | Copyright details for your feed                                   | `Copyright (c) 2012-2014, Daniel Imms; all rights reserved.`
| `home_url`               | The home URL excluding the `/` at the end                         | `http://www.growingwiththeweb.com`
| `home_url_canonical`     | The canonical (best) home URL, ideally include the `/` at the end | `http://www.growingwiththeweb.com/`
| `site_title`             | Title of the website                                              | `Growing with the Web`
| `unique_feed_identifier` | Some unique string to identify the feed, ideally include your URL | `http://www.growingwiththeweb.com/all_feed`



## Further customisations

### Beefing up `<content>`

The main section that is usually customised is the `<content>` element which defines the content of a post/entry/article. If you're using the `excerpt_separator` feature then `{% raw %}{{ post.excerpt }}{% endraw %}` could be used in addition to a link so your users will need to click through to the site to read the entire post.

<!--prettify lang=xml-->
<pre><code>{% raw %}&lt;content type="html"&gt;
  &amp;lt;p&amp;gt;{{ post.excerpt | xml_escape }}&amp;lt;/p&amp;gt;
  &amp;lt;p&amp;gt;&amp;lt;a href="<mark>home_url</mark>{{ post.url }}"&amp;gt;Read the full article&amp;lt;/&amp;gt;&amp;lt;/p&amp;gt;
&lt;/content&gt;{% endraw %}</code></pre>

Banner ads are another example of something that can be slipped into the `<content>` element easily.

### External posts

I setup an external post system in my blog that allows me to add articles I write externally to the homepage and feed. If the `external_url` property exists in a post's YAML header then it will link to the external URL instead of the internally generated page. The feed code for this is as follows:

<!--prettify lang=xml-->
<pre><code>{% raw %}{% if post.external_url %}
&lt;link href="{{ post.external_url }}"/&gt;
{% else %}
&lt;link href="<mark>home_url</mark>{{ post.url }}"/&gt;
{% endif %}
&lt;content type="html"&gt;
  &amp;lt;p&amp;gt;{{ post.excerpt | xml_escape }}&amp;lt;/p&amp;gt;
  &amp;lt;p&amp;gt;&amp;lt;a href="{% if post.external_url %}{{ post.external_url }}{% else %}<mark>home_url</mark>{{ post.url }}{% endif %}"&amp;gt;Read the full article&amp;lt;/&amp;gt;&amp;lt;/p&amp;gt;
&lt;/content&gt;{% endraw %}</code></pre>