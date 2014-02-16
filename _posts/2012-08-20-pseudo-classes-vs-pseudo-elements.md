---
layout      : post
title       : Pseudo-classes vs pseudo-elements
tags        : [CSS]
primarytag  : CSS
intro       : The difference between pseudo-classes and pseudo-elements can be a little confusing until you have it spelt out for you. Basically a pseudo-class is a selector that assists in the selection of something that cannot be expressed by a simple selector, for example <code>:hover</code>. A pseudo-element however allows us to create items that do not normally exist in the document tree, for example <code>::after</code>.
---



## Pseudo-classes

Pseudo-classes select regular elements but under certain conditions, like when their position relative to siblings or when they're under a particular state. Here is a list of pseudo-classes in CSS3:

### Dynamic pseudo-classes

- `:link`
- `:visited`
- `:hover`
- `:active`
- `:focus`

### UI element states pseudo-classes

- `:enabled`
- `:disabled`
- `:checked`

### Structural pseudo-classes

- `:first-child`
- `:nth-child(n)`
- `:nth-last-child(n)`
- `:nth-of-type(n)`
- `:nth-last-of-type(n)`
- `:last-child`
- `:first-of-type`
- `:last-of-type`
- `:only-child`
- `:only-of-type`
- `:root`
- `:empty`

### Other pseudo-classes

- `:not(x)`
- `:target`
- `:lang(language)`



## Pseudo-elements

Pseudo-elements effectively create new elements that are not specified in the markup of the document and can be manipulated much like a regular element. This introduces huge benefits for creating cool effects with minimal markup, also aiding significantly in keeping the presentation of the document out of the HTML and in CSS where it belongs.

With the introduction of CSS3 the difference between pseudo-classes and pseudo-elements is a lot more clear as it is now the standard to use double colon (`::`) on pseudo-elements, however we should be using single colon until certain browsers are phased out (I'm looking at you IE8 and below). Here is a list of pseudo-elements in CSS3:

- `::before`
- `::after`
- `::first-letter`
- `::first-line`

### Animations on pseudo-elements

Unfortunately animations and transitions on pseudo elements are buggy or not implemented at the moment in most browsers.



## Wrap up

If you still have difficulty remembering the difference, just think of what the names 'pseudo-element' and 'pseudo-class' are actually implying. A pseudo-element is a 'fake' element, it isn't really in the document with the 'real' ones. Pseudo-classes are like 'fake' classes that are applied to elements under certain conditions, much like how you would manipulate the classes of elements using JavaScript.
