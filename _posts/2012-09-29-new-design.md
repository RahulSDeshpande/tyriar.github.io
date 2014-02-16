---
layout      : post
title       : "Redesign #1"
tags        : [Blogging, CSS, Design, HTML]
socialimage : /images/2012/09/29/blog-v2.png
primarytag  : Design
intro       : I decided to give the blog a major overhaul and redesign the template as previously it was just using a one of the built-in Blogger templates with a few minor alterations. I was originally quite hesitant in modifying the template directly as I didn't really understand how it was put together, the blog has been in place for some time now so I thought it was about time to give it a go.
---

Most of the redesign was done last week, this week I went through and fixed up all the old posts and a few minor issues that revealed themselves with the styles.



## Goals

There were a few goals I wanted to accomplish from the redesign/overhaul.

1. Make it&nbsp;modern, clean and&nbsp;attractive.
2. Familiarise myself with how the Blogger templates worked.
3. Fix the way I was including files into posts, just include them globally.
4. Tidy up old posts; layouts (code blocks, inline styles), links (pointing at old domain) and add jump breaks.
5. Make the top menu less of a random mash up of pages.


I think it turned out pretty well and feel that I accomplished all the goals.



## Key new features

1. The top menu is no longer the blog "pages", instead it now links to C#, CSS, HTML and JavaScript label searches and an about page.

  {% include post-image.html class="center-aligned" alt="Header" src="/images/2012/09/29/header.png" %}

2. An "experiments" section is now located underneath the Social / RSS section and includes what used to be in the random mess at the top.

  {% include post-image.html class="center-aligned" alt="Experiments" src="/images/2012/09/29/experiments.png" %}

3. The labels section now visualises the amount of posts with bars underneath.

  {% include post-image.html class="center-aligned" alt="Labels" src="/images/2012/09/29/labels.png" %}

4. Instead of the icky `style="background-color:yellow"` from the WYSIWIG editor I've started using `<mark>`.

5. I modified the code styles to match the layout and found the unofficial [JavaScript logo][1] which looks a hell of a lot nicer than the VS2010 JScript icon I was using before.



## Outcome

### Before

{% include post-image.html class="center-aligned" alt="Version 1" src="/images/2012/09/29/blog-v1.png" %}

### Design mockup

{% include post-image.html class="center-aligned" alt="Version 2 mockup" src="/images/2012/09/29/mockup.png" %}

### After

{% include post-image.html class="center-aligned" alt="Version 2" src="/images/2012/09/29/blog-v2.png" %}



[1]: https://github.com/voodootikigod/logo.js