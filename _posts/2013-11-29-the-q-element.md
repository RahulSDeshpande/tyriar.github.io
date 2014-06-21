---
layout     : post
title      : q HTML element
tags       : [Accessibility, HTML]
primarytag : HTML
gpluspost  : 4iMfjv9zsZV
intro      : The <code>q</code> HTML element is used to represent an inline quote. Now regular quotes ("") can represent this just fine, surrounding the quote in the <code>q</code> tag differs in that it explicitly indicates that the text is a quote, removing ambiguities that it could be emphasis, irony, etc.
---

In addition to explicitly stating that the text is a quote, it also provides a way to consistently style all quotes with minimal markup.

## Usage

### A quote

To use the `q` element, surround the quote with the tag. Ensure you ***do not*** add quotes in addition to the `q` tag or they will come through twice.

<!--prettify lang=html-->
    <p>Gandalf opened the doors to Moria by saying <q>Mellon</q>.</p>

### A quote within a quote

It is also possible to specify a quote within a quote. The CSS `quotes` property let's us define what the outer and inner quotes look like as explained in the styling section.

<!--prettify lang=html-->
    <p>She told me <q>Paul said this morning <q>don't take that one.</q></q></p>



## Styling

This is the default CSS for the `q` element.

<!--prettify lang=css-->
    q {
      display: inline;
    }
    q::before {
      content: open-quote;
    }
    q::after {
      content: close-quote;
    }

The pseudo-elements use the special values for `content`; `open-quote` and `close-quote`. These are used in conjunction with the [`quotes`][4] rule which can specify what quotes are used at varying levels of depth. This snippet will surround the first level of the `q` elements on a page with double quotes and the second level with single quotes.

<!--prettify lang=css-->
    body {
      quotes: '"' '"' "'" "'";
    }

Combined with the `lang` pseudo-class, it's possible to use different quotes for different languages.

<!--prettify lang=css-->
    :lang(en) > q {
      quotes: '"' '"' "'" "'";
    }
    :lang(ja) > q {
      quotes: '&#12300;' '&#12301;' '&#12302;' '&#12303;'
    }
    :lang(fr) > q {
      quotes: '&laquo;' '&raquo;' '&#x201C;' '&#x201D;';
    }

More advanced styling is possible, unicode characters can be specified using the `'\xxxx'` syntax.

{% include codepen.html id="FkotK" height="160" description="The &lt;q&gt; element" %}



## Further reading

Read more on the `q` element from the following sources:

- [HTML5 Spec][1]
- [Mozilla Developer Network][2]
- [Web Platform Docs][3]



[1]: http://www.w3.org/TR/html5/text-level-semantics.html#the-q-element
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
[3]: http://docs.webplatform.org/wiki/html/elements/q
[4]: http://www.w3.org/TR/css3-content/#specifying
