---
layout     : post
title      : samp HTML element
tags       : [Accessibility, CSS, Design, HTML]
primarytag : HTML
gpluspost  : PN2Y1wg7DC7
intro      : The <a href="http://www.w3.org/TR/html5/text-level-semantics.html#the-samp-element"><code>samp</code> HTML element</a> is used to represent (sample) output from a program. It has been around since <a href="http://www.w3.org/MarkUp/draft-ietf-iiir-html-01.txt">HTML1</a>, though back it was simply used to markup <q>a sequence of literal characters</q>.
---

By default `samp` is an inline element so it won't break the flow of the page, this means that it can be used within a block of text without any problems.



## Usage

### Inline sample output

The `samp` element can represent a program's output within a paragraph or block of text by simply wrapping the output in the tag.

<!--prettify lang=html-->
    <p>The browser will say <samp>404 Page Not Found</samp>.</p>

### A block of sample output

A block of sample output is typically accompanied with the `pre` (preformatted) tag.

<!--prettify lang=html-->
    <pre>
    <samp>StackOverflowException was unhandled

    An unhandled exception of type 'System.StackOverflowException' occurred in MyAssembly.dll</samp>
    </pre>

If representing command line input as well as output, the `pre`, `samp` and [`kbd`][3] elements can be combined into a *giant ball of semantic goodness*.

<!--prettify lang=html-->
    <pre>
    <samp>$ <kbd>git status<kbd>
    # On branch master
    nothing to commit, working directory clean</samp>
    </pre>



## Styling

Given what we now know about the `samp` element, we can use this knowledge to intelligently style the elements with minimal markup, depending on the context of course.

For example a command line tool's website could style `samp` accordingly:

{% include codepen.html id="cCyba" height="300" description="The &lt;samp&gt; element" %}



## Further reading

Read more on the `samp` element from the following sources:

- [HTML5 Spec][1]
- [Mozilla Developer Network][4]
- [Web Platform Docs][5]



[1]: http://www.w3.org/TR/html5/text-level-semantics.html#the-samp-element
[3]: {{site.baseurl}}/2013/11/the-element.html
[4]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
[5]: http://docs.webplatform.org/wiki/html/elements/samp

[kbd]: {{site.baseurl}}/2013/11/the-element.html
