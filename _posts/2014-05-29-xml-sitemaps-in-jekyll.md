---
layout      : post
draft : 1
title       : XML sitemaps in Jekyll
tags        : [GitHub, Jekyll, SEO, XML]
preview     : /images/2014/05/29/logo.png
socialimage : /images/2014/05/29/logo.png
primarytag  : Jekyll
intro       : This post explains the what and why of <a href="http://www.growingwiththeweb.com/2014/03/xml-sitemaps.html">XML sitemaps</a> and shows how to implement one in <a href="http://jekyllrb.com/">Jekyll's</a> Liquid templating engine.
---

{% include post-image.html class="right-col" alt="Jekyll logo" src="/images/2014/05/29/logo.png" %}

## Basic template

Here is the basic Liquid template I use for my sitemap that defines:

- All the posts in the site as 0.5 priority
- All the pages in the site
 - The home page is marked to change daily with a priority of 1.0
 - Paged index pages using [paginator][4] as 0.1 priority
 - Other pages as 0.5 priority

Parts that need to be modified to suit the site are <mark>marked</mark> with explainations in the variables section below.

<!--prettify lang=xml-->
<pre><code>{% raw %}---
layout: nil
---

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  {% for post in site.posts %}
    &lt;url&gt;
      &lt;loc&gt;<mark>site_url</mark>{{ site.baseurl }}{{ post.url }}&lt;/loc&gt;
      &lt;priority&gt;0.5&lt;/priority&gt;
    &lt;/url&gt;
  {% endfor %}
  {% for page in site.pages %}
    &lt;url&gt;
      &lt;loc&gt;<mark>site_url</mark>{{ site.baseurl }}{{ page.url }}&lt;/loc&gt;
      {% if page.url == "<mark>home_page_inc</mark>" %}
        &lt;priority&gt;1.0&lt;/priority&gt;
        &lt;changefreq&gt;daily&lt;/changefreq&gt;
      {% else %}
        {% if page.url contains "<mark>home_page</mark>" %}
          &lt;priority&gt;0.1&lt;/priority&gt;
        {% else %}
          &lt;priority&gt;0.5&lt;/priority&gt;
        {% endif %}
      {% endif %}
    &lt;/url&gt;
  {% endfor %}
&lt;/urlset&gt;{% endraw %}</code></pre>



## Variables

| Variable        | Description                                       | Example
|-----------------|---------------------------------------------------|--------
| `site_url`      | The home URL excluding the `/` at the end         | `http://www.growingwiththeweb.com`
| `home_page_inc` | The relative URL of the home page (including `/`) | `/index.html`
| `home_page`     | The relative URL of the home page (excluding `/`) | `index.html`



## Further customisations

### A custom priority for posts or pages

The basic template covers most bases and lets you get on with building your content without worrying about SEO much. There are some times when this won't fit though, such as if you have a great page or want to give a post a more fine-grained `priority`. I'll look at enabling this for *pages* in these examples as it's fairly easy to apply the same technique to posts.

To start with, create a variable in the relevant post's <abbr title="YAML Ain't Markup Language">YAML</abbr> header.

    ---
    layout    : some-layout
    title     : Some post title
    sitemap   :
     priority : 0.9
    ---

Then check if the variable exists in the sitemap and override the default if so.

<!--prettify lang=xml-->
<pre><code>{% raw %}{% if page.sitemap.priority %}
  &lt;priority&gt;page.sitemap.priority&lt;/priority&gt;
{% else %}
  &lt;priority&gt;0.5&lt;/priority&gt;
{% endif %}{% endraw %}</code></pre>

### 'Featured' posts

I introduced the concept of 'featured' posts recently which are located on the [top articles][1] and also have higher priority in the sitemap. This is because when someone searches for something, I want my better posts that match the search query to take priority over the lesser ones. For example example, if someone searched for 'CSS', I'd prefer that the deeper article explaining [Triangles in CSS][2] appeared over one of my [shorter ones with a demo][3].

This can be accomplished again by introducing another YAML variable and wrapping if statement in the Liquid template.

    ---
    layout     : some-layout
    title      : Some post title
    isfeatured : 1
    ---

<!--prettify lang=xml-->
<pre><code>{% raw %}{% if post.isfeatured %}
  &lt;priority&gt;1.0&lt;/priority&gt;
{% else %}
  &lt;priority&gt;0.5&lt;/priority&gt;
{% endif%}{% endraw %}</code></pre>



[1]: http://www.growingwiththeweb.com/p/top-articles.html
[2]: http://www.growingwiththeweb.com/2013/03/triangles-in-css.html
[3]: http://www.growingwiththeweb.com/2012/10/chrome-gmail-logo-in-pure-css.html
[4]: http://jekyllrb.com/docs/pagination/
