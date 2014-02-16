---
layout      : post
title       : CSS selectors you must know
tags        : [CSS]
primarytag  : CSS
intro       : Here is a collection of CSS selectors that you really need to know if you work with CSS. Each section will first describe what is selected and then provide an example first with the CSS and then the HTML if applicable, the selected elements will be <mark>marked</mark>.
---



## <code>S<sub>1</sub> S<sub>2</sub></code>

This selects all elements matching <code>S<sub>2</sub></code> that have an ancestor matching <code>S<sub>1</sub></code>.

<!--prettify lang=css-->
    div span

<pre class="prettyprint lang-html">
&lt;span&gt;Span 1&lt;/span&gt;
&lt;div&gt;
  <mark>&lt;span&gt;</mark>Span 2<mark>&lt;/span&gt;</mark>
&nbsp; &lt;div&gt;
&nbsp;   <mark>&lt;span&gt;</mark>Span 3<mark>&lt;/span&gt;</mark>
  &lt;/div&gt;
&lt;/div&gt;
</pre>



## <code>S<sub>1</sub> &gt; S<sub>2</sub></code>

This selects all elements where <code>S<sub>2</sub></code> is a direct descendant of <code>S<sub>1</sub></code>.

<!--prettify lang=css-->
    #first > span

<pre class="prettyprint lang-html">
&lt;span&gt;Span 1&lt;/span&gt;
&lt;div id="first"&gt;
  <mark>&lt;span&gt;</mark>Span 2<mark>&lt;/span&gt;</mark>
&nbsp; &lt;div&gt;
&nbsp;   &lt;span&gt;Span 3&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>



## `S[attr=val]`

This selects all elements matching `S` that also have the `attr` equal the specified `val`.

<!--prettify lang=css-->
    input[type=text]

<pre class="prettyprint lang-html"><code>&lt;input type="radio" /&gt;
<mark>&lt;input type="text" /&gt;</mark>
</code></pre>



## `S:link`

This selects all elements matching `S` where the link has not been visited.

<!--prettify lang=css-->
    a:link

<pre class="prettyprint lang-html">
&lt;!-- this link has been visited before --&gt;
&lt;a href="someurl"&gt;Some URL&lt;/a&gt;
&lt;!-- this link has not been visited before --&gt;
<mark>&lt;a href="anotherurl"&gt;</mark>Another URL<mark>&lt;/a&gt;</mark>
</pre>



## `S:visited`

This selects all elements matching `S` where the link has been visited.

<!--prettify lang=css-->
    a:link

<pre class="prettyprint lang-html">
&lt;!-- this link has been visited before --&gt;
<mark>&lt;a href="someurl"&gt;</mark>Some URL<mark>&lt;/a&gt;</mark>
&lt;!-- this link has not been visited before --&gt;
&lt;a href="anotherurl"&gt;Another URL&lt;/a&gt;
</pre>



## `S:active`

This selects the element matching `S` that is currently being activated by the user. The following should clarify what state an element that accepts input is in while being interacted with using a mouse or keyboard.

- Clicked - The element is both :active and :focus
- Selected with keyboard (tab) - The element is :focus
- Activated with keyboard (enter) - The element is :active

<!--prettify lang=css-->
    button:active



## `S:focus`

This selects the element matching `S` that is currently being focused by the user. See the above for an explanation of when this selector applies.

<!--prettify lang=css-->
    button:focus



## `S:first-child`

This selects the elements matching `S` only when it is the first child of its parent.

<!--prettify lang=css-->
    li:first-child

<pre class="prettyprint lang-html">
&lt;ul&gt;
  <mark>&lt;li&gt;</mark>First<mark>&lt;/li&gt;</mark>
  &lt;li&gt;Second&lt;/li&gt;
  &lt;li&gt;Third&lt;/li&gt;
&lt;/ul&gt;
</pre>



## `S:last-child`

This selects the elements matching `S` only when it is the last child of its parent.

<!--prettify lang=css-->
    li:last-child

<pre class="prettyprint lang-html">
&lt;ul&gt;
  &lt;li&gt;First&lt;/li&gt;
  &lt;li&gt;Second&lt;/li&gt;
  <mark>&lt;li&gt;</mark>Third<mark>&lt;/li&gt;</mark>
&lt;/ul&gt;
</pre>



## `S:checked`

This selects all elements matching `S` where they are checked. This only applies to radio buttons and check boxes.

<!--prettify lang=css-->
    input[type=radio]:checked

<pre class="prettyprint lang-html">
<mark>&lt;input type="radio" checked="checked" /&gt;</mark>
&lt;input type="radio" /&gt;
</pre>



## `S::before`

This selects all elements matching `S`, inserts a 'fake' element before it and applies the CSS to that new element. You need to specify a content rule in order to have it show up.

<!--prettify lang=css-->
    #social-bar li::before

<pre class="prettyprint lang-html">
&lt;ul id="social-bar"&gt;
  <mark>&lt;!-- Adds the element here --&gt;</mark>
  &lt;li&gt;Twitter&lt;/li&gt;
&lt;/ul&gt;
</pre>



## `S::after`

This selects all elements matching `S`, inserts a 'fake' element after it and applies the CSS to that new element. You need to specify a content rule in order to have it show up.

<!--prettify lang=css-->
    #social-bar li::after

<pre class="prettyprint lang-html">
&lt;ul id="social-bar"&gt;
  &lt;li&gt;Twitter&lt;/li&gt;
  <mark>&lt;!-- Adds the element here --&gt;</mark>
&lt;/ul&gt;
</pre>


### Combining with `::before`

You can create some really cool effects with minimal markup using `::before` and `::after`, a common example of this is creating a pure-CSS speech bubble or tooltip, like with the social links on my blog.

{% include post-image.html class="center-aligned" alt="Social panel" src="/images/2012/08/19/social.png" %}