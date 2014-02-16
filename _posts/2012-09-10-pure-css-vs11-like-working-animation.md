---
layout      : post
title       : Pure CSS VS11-like 'working' animation
tags        : [CSS]
primarytag  : CSS
intro       : I thought it would be fun to try my hand at producing a similar effect as the Visual Studio 2012 installer working/busy animation using pure-CSS. I think it turned out pretty well, it works in Opera, Safari, Chrome and Firefox.
---

It's interesting comparing how it came out in each of the browsers:

1. Safari felt like it was really struggling to handle it,
2. Chrome was drawing the circles a bit choppy due to the floating point positions,
3. Firefox was really nice and smooth, and
4. Opera was good but not quite as good as Firefox.



## Demo

{% include codepen.html id="ibksJ" height="272" description="VS11-like working animation" %}