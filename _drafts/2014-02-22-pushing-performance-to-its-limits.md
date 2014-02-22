Last week I switched on the [big redesign][1] and couldn't be happier with how it turned out. One topic I didn't cover too deeply on the post though was performance. This post will go deep into the technique I used and present the results.

## Numbers say it best

One of the tools I used extensively during this process was [webpagetest.org][2] since it provides a pretty deep insight into the page load time and user experience of a web page. The main metric I was optimising around the [speed index][3] of the page, this is the area above the a curve in the graph of time vs visual completeness.

$$\text{Speed Index} = \int_0^{end} 1 - \frac{VC}{100}$$

$$\text{end} = \text{end time in milliseconds}$$

$$\text{VC} = \text{% visually complete}$$

<< Image of speed index graph >>
<< Caption "From webpagetest.org documention" >>

### Test configuration

I used the bot *Dulles Thinkpad T430* with the Chrome browser on Cable. They loaded the [homepage][4] 9 times each to give a decent sample size. 

### Results

Here are the results split into first load (non-cached) and the median repeated load (cached).

<table>
<tr>
<th></th>
<th colspan="2">First load</th>
<th colspan="2">Repeated load</th>
</tr>
<tr>
<th>Metric</th>
<th>Before</th>
<th>After</th>
<th>Before</th>
<th>After</th>
</tr>
<tr>
<th>Load time</th>
<td>1.738s</td>
<td>1.329s</td>
<td>1.259s</td>
<td>0.868s</td>
</tr>
<tr>
<th>Start render</th>
<td>1.394s</td>
<td>0.511s</td>
<td>1.097s</td>
<td>0.809s</td>
</tr>
<tr>
<th>Speed index</th>
<td>1684</td>
<td>507</td>
<td>1174</td>
<td>800</td>
</tr>
<tr>
<th>DOM elements</th>
<td>602</td>
<td>381</td>
<td>602</td>
<td>381</td>
</tr>
</table>


### Analysis

Both first load and repeated load show improvements across the board for the new version of the page.



















Blogger run: http://www.webpagetest.org/result/140222_W6_1XE/
GH Pages run: http://www.webpagetest.org/result/140222_GA_1X5/
GH Pages with CloudFlare: http://www.webpagetest.org/result/140222_TE_3D1/

Considering my blog bounce rates are typically fairly high it's better to go without the full CDN



Post topics:

CSS size comparison
Inline above the fold styles
Grunt
JavaScript, merging, inlining
Minify all the things
Optimise images
SVG optimisation issues
http://www.webpagetest.org results compared to danielimms.blogspot.com
Compare other page speed analysis tools for more ideas
Pagespeed score comparison
Reduce nesting (remnants from Blogger)
Look through closed tasks for more

## What could I do to make it even *faster*?

CDN
Static resource caching
Switch to MathML when widely implemented


[1]: http://www.growingwiththeweb.com/2014/02/redesign-3-from-blogger-to-github-pages.html
[2]: http://www.webpagetest.org/
[3]: https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index
[4]: http://www.growingwiththeweb.com