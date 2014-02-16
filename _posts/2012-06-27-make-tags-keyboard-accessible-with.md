---
layout      : post
title       : Make tags keyboard accessible with tabindex
tags        : [Accessibility, HTML, JavaScript, jQuery]
primarytag  : Accessibility
intro       : HTML elements such as <code>div</code>, <code>span</code>, <code>img</code>, etc. don't normally accept input, but sometimes you'll want them to. For example if you have an image that does something when you click on it. If you want your site to be accessible it also needs to happen when you tab to the element and press enter.
---

There are two parts to this; giving the element a tab index and then hooking up the event. For the tab index simply set the `tabindex` attribute on the tag to 0 and the user will be able to navigate to the tag using the tab key. The following javascript snippet adds the event handlers using jQuery and shares the function (`triggerExample`) that is doing the work between both keydown and click events.

<!--prettify lang=html-->
    <img id="example" tabindex="0" src="..." />

<!--prettify lang=js-->
    $(document).ready(function () {
      $('#example')
        .click(triggerExample)
        .keydown(triggerExample);
    });

    function triggerExample(event) {
      if (event.keyCode == 13 || event.keyCode == 32 ||
          event.type == 'click') {
        doExample();
      }
    }

    function doExample() {
      alert('Image triggered');
    }

Remember that you can always test what can be accessed with the keyboard by hitting the tab key.
