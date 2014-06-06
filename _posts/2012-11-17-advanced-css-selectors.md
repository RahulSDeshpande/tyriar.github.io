---
layout      : post
title       : Advanced CSS selectors
tags        : [CSS]
primarytag  : CSS
intro       : A continuation of my post <a href="/2012/08/css-selectors-you-must-know.html">CSS selectors you must know</a>, this one is going to look at the more advanced selectors available to us. Each section will first describe what is selected and then provide an example first with the CSS and then the HTML if applicable, the selected elements will be <mark>marked</mark>.
---

## <code>S<sub>1</sub> ~ S<sub>2</sub></code>

This selects all sibling elements of <code>S<sub>1</sub></code> matching <code>S<sub>2</sub></code>.

<!--prettify lang=css-->
    h2 ~ p

<pre class="prettyprint lang-html">
&lt;h2&gt;Heading&lt;/h2&gt;
<mark>&lt;p&gt;</mark>Some paragraph.<mark>&lt;/p&gt;</mark>
<mark>&lt;p&gt;</mark>Another paragraph.<mark>&lt;/p&gt;</mark>
</pre>



## <code>S<sub>1</sub> + S<sub>2</sub></code>

This selects all elements matching <code>S<sub>2</sub></code> that are the next sibling of <code>S<sub>1</sub></code>. I've found this particularly useful when applied to radio button or checkbox labels.

<!--prettify lang=css-->
    input + label

<pre class="prettyprint lang-html">
&lt;input type="checkbox" /&gt;
<mark>&lt;label&gt;</mark>Checkbox<mark>&lt;/label&gt;</mark>
&nbsp;
</pre>



## `S[attr]`

This selects all elements matching `S` that have the attribute `attr` specified.

<!--prettify lang=css-->
    span[title]

<pre class="prettyprint lang-html">
&lt;span&gt;No title&lt;/span&gt;
<mark>&lt;span title="A link"&gt;</mark>Has title<mark>&lt;/span&gt;</mark>
<mark>&lt;span title=""&gt;</mark>Empty title<mark>&lt;/span&gt;</mark>
</pre>



## `S[attr=val]`

This selects all elements matching `S` that have the attribute `attr` specified and it equals `val`.

<!--prettify lang=css-->
    a[href="http://www.growingwiththeweb.com"]

<pre class="prettyprint lang-html">
&lt;a href="#"&gt;A link&lt;/a&gt;
<mark>&lt;a href="http://www.growingwiththeweb.com"&gt;</mark>Home<mark>&lt;/a&gt;</mark>
</pre>



## `S[attr~=val]`

This selects all elements matching `S` that has the attribute `attr` whose value is a whitespace separated list with `val` being one of the values.

<!--prettify lang=css-->
    *[title~="important"]

<pre class="prettyprint lang-html">
<mark>&lt;a title="This is a really important message."&gt;</mark>Hover over me<mark>&lt;/a&gt;</mark>
&lt;a title="This is a regular message."&gt;Hover over me&lt;/a&gt;
</pre>



## `S[attr|=val]`

This selects all elements matching `S` that has the attribute `attr` whose value is either exactly `val` of begins with `val` followed by '-'. This was primarily intended for use with the `hreflang` attribute that specifies the language of the resource at the end of a link.

<!--prettify lang=css-->
    a[hreflang|=en]

<pre class="prettyprint lang-html">
<mark>&lt;a hreflang="en-US"&gt;</mark>America<mark>&lt;/a&gt;</mark>
<mark>&lt;a hreflang="en-AU"&gt;</mark>Australia<mark>&lt;/a&gt;</mark>
&lt;a hreflang="ko-KR"&gt;Korea&lt;/a&gt;
</pre>



## `S[attr^=val]`

This selects all elements matching `S` that has the attribute `attr` whose value begins with `val`.

<!--prettify lang=css-->
    a[href^="https://"]

<pre class="prettyprint lang-html">
<mark>&lt;a href="https://www.growingwiththeweb.com"&gt;</mark>A Secure URL<mark>&lt;/a&gt;</mark>
</pre>



## `S[attr$=val]`

This selects all elements matching `S` that has the attribute `attr` whose value ends with `val`. I've found this particularly useful when styling ids in applications built with WebForms.

<!--prettify lang=css-->
    a[href$=".pdf"]

<pre class="prettyprint lang-html">
<mark>&lt;a href="/document.pdf"&gt;</mark>Document<mark>&lt;/a&gt;</mark>
</pre>



## `S[attr*=val]`

This selects all elements matching `S` that has the attribute `attr` whose value contains at least one instance of `val`.

<!--prettify lang=css-->
    a[href*="google.com"]

<pre class="prettyprint lang-html">
<mark>&lt;a href="http://www.google.com/"&gt;</mark>Google<mark>&lt;/a&gt;</mark>
</pre>



## <code>S<sub>1</sub>:not(S<sub>2</sub>)</code>

This selects all elements matching <code>S<sub>1</sub></code> that do not also match <code>S<sub>2</sub></code>.

<!--prettify lang=css-->
    div:not(.lonely)

<pre class="prettyprint lang-html">
<mark>&lt;div&gt;</mark>First<mark>&lt;/div&gt;</mark>
&lt;div class="lonely"&gt;Second&lt;/div&gt;
<mark>&lt;div&gt;</mark>Third<mark>&lt;/div&gt;</mark>
</pre>



## `S:nth-child(n)`

This selects all elements matching `S` where they are the `n`th child of their parent. We can make an expression using `n`, for example `:nth-child(2n+1)` will select the first child, the third child, the fifth child, etc.

<!--prettify lang=css-->
    li:nth-child(2n+1)

<pre class="prettyprint lang-html">
&lt;ul&gt;
  <mark>&lt;li&gt;</mark>List item 1<mark>&lt;/li&gt;</mark>
  &lt;li&gt;List item 2&lt;/li&gt;
  <mark>&lt;li&gt;</mark>List item 3<mark>&lt;/li&gt;</mark>
  &lt;li&gt;List item 4&lt;/li&gt;
  <mark>&lt;li&gt;</mark>List item 5<mark>&lt;/li&gt;</mark>
  &lt;li&gt;List item 6&lt;/li&gt;
&lt;/ul&gt;
</pre>



## `S:nth-last-child(n)`

This selects all elements matching `S` where they are the `n`th last child of their parent. Just like `:nth-child(n)` but it counts the other way.

<!--prettify lang=css-->
    li:nth-last-child(2n+1)

<pre class="prettyprint lang-html">
&lt;ul&gt;
  &lt;li&gt;List item 1&lt;/li&gt;
  <mark>&lt;li&gt;</mark>List item 2<mark>&lt;/li&gt;</mark>
  &lt;li&gt;List item 3&lt;/li&gt;
  <mark>&lt;li&gt;</mark>List item 4<mark>&lt;/li&gt;</mark>
  &lt;li&gt;List item 5&lt;/li&gt;
  <mark>&lt;li&gt;</mark>List item 6<mark>&lt;/li&gt;</mark>
&lt;/ul&gt;
</pre>



## `S:only-child`

This selects all elements matching S that has no siblings.

<!--prettify lang=css-->
    li:only-child

<pre class="prettyprint lang-html">
&lt;ul&gt;
  <mark>&lt;li&gt;</mark>List item 1.1<mark>&lt;/li&gt;</mark>
&lt;/ul&gt;
&lt;ul&gt;
  &lt;li&gt;List item 2.1&lt;/li&gt;
  &lt;li&gt;List item 2.2&lt;/li&gt;
&lt;/ul&gt;
</pre>



## `S:nth-of-type(n)`

This selects all elements matching S that are the `n`th element of their type within their siblings.

<!--prettify lang=css-->
    li:nth-of-type(3)

<pre class="prettyprint lang-html">
&lt;ul&gt;
  &lt;li&gt;Menu item 1&lt;/li&gt;
  &lt;li&gt;Menu item 2&lt;/li&gt;
  <mark>&lt;li&gt;</mark>Menu item 3<mark>&lt;/li&gt;</mark>
&lt;/ul&gt;
</pre>

## `S:nth-last-of-type(n)`

This selects all elements matching S that are the `n`th last element of their type within their siblings.

<!--prettify lang=css-->
    li:nth-last-of-type(3)

<pre class="prettyprint lang-html">
&lt;ul&gt;
  <mark>&lt;li&gt;</mark>Menu item 1<mark>&lt;/li&gt;</mark>
  &lt;li&gt;Menu item 2&lt;/li&gt;
  &lt;li&gt;Menu item 3&lt;/li&gt;
&lt;/ul&gt;
</pre>



## `S:first-of-type`

This selects all elements matching S that are the first of

<!--prettify lang=css-->
    p:first-of-type

<pre class="prettyprint lang-html">
&lt;h1&gt;Heading&lt;/h1&gt;
<mark>&lt;p&gt;</mark>Paragraph 1<mark>&lt;/p&gt;</mark>
&lt;p&gt;Paragraph 2&lt;/p&gt;
</pre>



## `S:only-of-type`

This selects all elements matching S that has no siblings of the same type.

<!--prettify lang=css-->
    .lonely:only-of-type

<pre class="prettyprint lang-html">
&lt;div&gt;
  <mark>&lt;span class="lonely"&gt;</mark>Menu item 3<mark>&lt;/span&gt;</mark>
  &lt;div class="lonely"&gt;Menu item 2&lt;/div&gt;
  &lt;div&gt;Menu item 1&lt;/div&gt;
&lt;/div&gt;
</pre>



## `S::first-letter`

This selects the first character of all elements matching S.

<!--prettify lang=css-->
    p:first-letter

<pre class="prettyprint lang-html">
&lt;p&gt;<mark>L</mark>orem ipsum dolor sit amet&lt;/p&gt;
</pre>



## `S::first-line`

This selects the first line of text of all elements matching S. This is the first line of text on the web page, not the markup.

<!--prettify lang=css-->
    p:first-line

<pre class="prettyprint lang-html">
&lt;p&gt;
  <mark>Lorem ipsum dolor sit amet, consectetur</mark>&lt;!--line ends--&gt; adipiscing
  elit. Nullam elementum nibh...
&lt;/p&gt;
</pre>
