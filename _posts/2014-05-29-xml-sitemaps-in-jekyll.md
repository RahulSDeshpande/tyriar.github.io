---
layout      : post
title       : XML sitemaps in Jekyll
tags        : [GitHub, Jekyll, SEO, XML]
preview     : /images/2014/05/29/logo.png
socialimage : /images/2014/05/29/logo.png
primarytag  : Jekyll
gpluspost   : iNvLWoLNEqf
intro       : This post demonstrates how to implement an <a href="/2014/03/xml-sitemaps.html">XML sitemap</a> in <a href="http://jekyllrb.com/">Jekyll's</a> Liquid templating engine. I recommend reading up on <a href="/2014/03/xml-sitemaps.html">XML sitemaps here</a> if you aren't familiar with them.
---

{% include post-image.html class="right-col" alt="Jekyll logo" src="/images/2014/05/29/logo.png" %}

## Basic template

Here is the basic Liquid template used for Growing with the Web's <a href="/sitemap.xml">XML sitemap</a>, it defines:

- All the posts in the site as 0.5 priority
- All the pages in the site
   - The home page is marked to change daily with a priority of 1.0
   - Paged index pages using [paginator][4] as 0.1 priority
   - Other pages as 0.5 priority

Parts that need to be modified to suit the site are <mark>marked</mark> with explanations in the variables section below.

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

The basic template covers most bases and lets you get on with building your content without worrying so much about SEO. There are some times when this won't fit though, like if you have a great page or want to give a post a more fine-grained `priority`. I'll look at enabling this for *pages* in these examples as it's fairly easy to apply the same technique to posts.

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
  &lt;priority&gt;{{ page.sitemap.priority}} &lt;/priority&gt;
{% else %}
  &lt;priority&gt;0.5&lt;/priority&gt;
{% endif %}{% endraw %}</code></pre>

### 'Featured' posts

I introduced the concept of 'featured' posts recently which are located in the [top articles][1] link in the header and also have higher priority in the sitemap. This is because when someone searches for something, I want the posts that match the search query that I consider to be better to take priority over the lesser ones. For example, if someone searched for 'CSS', I'd prefer that the article explaining [Triangles in CSS][2] in depth appeared over one of my [shorter ones with a demo][3].

This can be accomplished again by introducing another YAML variable and a wrapping if statement in the Liquid template.

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



[1]: /p/top-articles.html
[2]: /2013/03/triangles-in-css.html
[3]: /2012/10/chrome-gmail-logo-in-pure-css.html
[4]: http://jekyllrb.com/docs/pagination/
