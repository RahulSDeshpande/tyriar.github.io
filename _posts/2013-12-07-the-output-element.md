---
layout     : post
title      : output HTML element
tags       : [Accessibility, HTML]
primarytag : HTML
intro      : The <code>output</code> HTML element was introduced in HTML5 and represents a <em>calculated value</em> belonging to a <code>form</code>. An example use case is client-side calculation on a shopping website's checkout page.
---

## `output` vs `samp`

The purpose of `output` can be easily confused with that of the [`samp`][5] element; to represent a block of program *output*. The `output` element **should not** be used for this purpose.

Its name comes from the `input` element, since the typical use case for the element is to *output* the sum of several `input` element values. Perhaps something like `computed` would have been a more fitting name to reduce confusion.



## Attributes

### `for`

The `for` attribute can be used to create an explicit relationship between the result of the calculation and the elements that calculated it. Similar to the `for` attribute of the `label` element, the value is a space-separated list of IDs.

### `form`

The `output` element can be located outside of a `<form>` but still associated with one by using the `form` attribute.



## Usage

### Simple example

This example uses the `valueAsNumber` property for convenience, which was also introduced in HTML5 to the [`HTMLInputElement` DOM interface][4].

<!--prettify lang=html-->
    <form onsubmit="return false" oninput="o.value = a.valueAsNumber + b.valueAsNumber;">
      <input name="a" type="number"> +
      <input name="b" type="number"> =
      <output name="o"></output>
    </form>

### Advanced example

{% include codepen.html id="lmoLB" height="172" description="The &lt;output&gt; element" %}



## Further reading

Read more on the `output` element from the following sources:

- [HTML5 Spec][1]
- [Mozilla Developer Network][2]
- [Web Platform Docs][3]




[1]: http://www.w3.org/TR/html5/forms.html#the-output-element
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
[3]: http://docs.webplatform.org/wiki//html/elements/output
[4]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
[5]: {{site.baseurl}}/2013/11/the-samp-element.html
