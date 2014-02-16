While playing with [Jekyll][1] I've found that the markdown parser Maruku doesn't make the current [Codepen][2] embed code blocks.

{% include codepen.html id="AeshH" height="280" description="The &lt;progress&gt; element #2" %}

Maruku seems to have a problem [parsing Markdown where the attributes done have a value. The issue can be resolved by changing the `script` tag's `async` attribute to `async="async"`.

<pre class="prettyprint lang-html">
&lt;script async="async" src="//codepen.io/assets/embed/ei.js"&gt;&lt;/script&gt;
</pre>

[1]: http://jekyllrb.com/
[2]: http://codepen.io/
