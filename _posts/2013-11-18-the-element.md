---
layout     : post
title      : kbd HTML element
tags       : [Accessibility, CSS, Design, HTML]
primarytag : 
intro      : The <a href="http://www.w3.org/TR/html5/text-level-semantics.html#the-kbd-element"><code>kbd</code> HTML element</a> is used to represent some form of user input. Typically it represents keyboard input (where its name comes from) but can be used to represent any type of input that can be represented in text, such as voice commands.
---

While it may not be familiar to most web developers it has actually been part of HTML since the [first proposal for a specification][2] (HTML1 was 1993!), though the meaning has changed quite a bit since then.

## Usage

There are a few different ways to use it as defined by the HTML5 spec.

### Keystrokes

The `kbd` element by itself generally represents a keystroke.

<!--prettify lang=html-->
    <p>Press the <kbd>Space</kbd> key to continue.</p>

When chaining keys together, ideally you would nest each keystroke within their own `kbd` element.

<!--prettify lang=html-->
    <p>Press <kbd><kbd>Ctrl</kbd>+<kbd>S</kbd></kbd> to save.</p>

### Voice commands

Voice commands can be represented in the same fashion as keystrokes; by wrapping the command in the `kbd` tag.

<!--prettify lang=html-->
    <p>Say <kbd>OK Google</kbd> followed by your command.</p>

### Input based on system output

The ideal way to represent input that is based on system output, such as a menu item, is to wrap the whole command in a `kbd`, each individual command in a `kbd` and each individual command again in a `samp` element.

<!--prettify lang=html-->
    <p>To save, select <kbd><kbd><samp>File</samp></kbd> | <kbd><samp>Save</samp></kbd></kbd>.</p>

This really does seem overkill and the [spec actually says][1] that such precision isn't necessary and simply wrapping the entire command in a single `kbd` is equally fine.

<!--prettify lang=html-->
    <p>To save, select <kbd>File | Save</kbd>.</p>

### Input as it was echoed by the system

The prime example of this would be a program's output telling the user what to input, like a help message for a command line program or an instructional dialog in a GUI program. The ideal way to represent such a message is to wrap the entire output in a `samp` element and the inner-input commands in `kbd` tags.

<!--prettify lang=html-->
    <p>The program should remind you:</p>

    <samp>Don't forget to frequently save your progress by hitting <kbd><kbd>Ctrl</kbd>+<kbd>S</kbd></kbd></samp>

## Styling

A website that consistently uses the `kbd` elements enables the use of some clever styles that better represent the input. The styles that are used on this site for example:

<!--prettify lang=css-->
    kbd > kbd {
      box-shadow: 0 1px 0 rgba(0,0,0,.2), 0 0 0 3px #eee inset;
      border-radius: 3px;
      padding: .1em .7em;
      border: 1px solid #ccc;
      font-family: Arial, sans-serif;
      background-color: #eee;
      display: inline-block;
      margin: 0 .1em;
      white-space: nowrap;
      font-size: .7em;
    }

Here it is in action:

{% include codepen.html id="AcdIF" height="160" description="The &lt;kbd&gt; element" %}

## Wrap-up

Remember that the `kbd` element is a text-level semantic element and following exactly to the recommendation may not be necessary depending on the situation. As mentioned above, the [HTML5 spec][1] explicitly mentions that such precision isn't necessary. The spec outlines the *most* semantic way to markup the input, simply wrapping the items in a `kbd` tag is probably sufficient to get the point across clearly in most cases.

## Further reading

Read more on the `kbd` element from the following sources:

- [HTML5 Spec][1]
- [Mozilla Developer Network][3]
- [Web Platform Docs][4]


[1]: http://www.w3.org/TR/html5/text-level-semantics.html#the-kbd-element
[2]: http://www.w3.org/MarkUp/draft-ietf-iiir-html-01.txt
[3]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
[4]: http://docs.webplatform.org/wiki/html/elements/kbd
