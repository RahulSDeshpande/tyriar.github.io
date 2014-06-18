---
layout      : post
title       : progress HTML element
tags        : [Accessibility, CSS, Design, HTML]
primarytag  : HTML
gpluspost   : caQTidMe8WL
intro       : The <a href="http://www.w3.org/TR/html5/forms.html#the-progress-element"><code>progress</code> HTML element</a> was introduced in HTML5 and is used to represents the completion progress of a task. Typically it is displayed as a progress bar but this can be overridden so is up to the web developer.
---

Developers should make sure it is associated with a `label` element, especially when the label is not immediately preceding it. To support older browsers that don't support the `progress` element, a textual description of the progress can be included within the element.

At the time of writing this article, [support][1] is pretty good for desktop with the exception of requiring at least IE10, mobile support isn't fantastic though.



## Determinate vs indeterminate

Two types of progress bars can be used: determinate, where a completion percentage can be reported; or indeterminate, where progress is being made but the completion percentage is unknown.

A progress bar is determinate when the `value` attribute is set. The `position` helper attribute returns the completion percentage of the progress bar (ie. `value / max`).

A progress bar is indeterminate when no `value` attribute is specified, it can also be explicitly defined by specifying `value="-1"`. Note that the `position` attribute will return `-1` for an indeterminate progress bar.



## `progress` vs `meter`

The `progress` element should not be used to represent a *gauge*, such as disk usage or a test score. The `meter` element should be used in this case. The `progress` element differs from the `meter` element in that it is *only* used to represent the progress of a task.



## Usage

### Determinate progress bar

<!--prettify lang=html-->
    <progress value="0" max="100">0%</progress>

### Indeterminate progress bar

<!--prettify lang=html-->
    <progress>0%</progress>;



## Styling

[CSS-Tricks][2] has a great article by [Pankaj Parashar][3] on some advanced styling of the `progress` element. Unfortunately, currently styling is different for different browsers.

You target determinate progress bars using `progress[value]` and indeterminate ones with `progress:not([value])`, then use browser-specific pseudo-elements (which can be viewed in the shadow DOM) to style the different parts.

{% include codepen.html id="kACIq" height="271" description="The &lt;progress&gt; element #1" excludescript="1" %}

Here is a more advanced example of progress bar displayed as a pie chart for WebKit-based browsers. Unfortunatley `transform:rotate(attr(value deg));` doesn't work yet so it will be difficult to use this for a progress bar that isn't static.

{% include codepen.html id="AeshH" height="280" description="The &lt;progress&gt; element #2" %}



## Further reading

Read more on the `progress` element from the following sources:

- [HTML5 Spec][4]
- [Mozilla Developer Network][5]
- [Web Platform Docs][6]



[1]: http://caniuse.com/#feat=progressmeter
[2]: http://css-tricks.com/html5-progress-element/
[3]: http://pankajparashar.com/
[4]: http://www.w3.org/TR/html5/forms.html#the-progress-element
[5]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
[6]: http://docs.webplatform.org/wiki/html/elements/progress
