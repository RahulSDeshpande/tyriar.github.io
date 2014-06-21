---
layout      : post
title       : Disabling the context menu with Dart
tags        : [Dart]
primarytag  : Dart
gpluspost   : f66fEPQhFxE
intro       : To disable the context menu on an element using Dart, simply add a listener to <code>onContextMenu</code> which calls <code>e.preventDefault()</code> to stop the event from bubbling up. 
---

<!--prettify lang=dart-->
    element.onContextMenu.listen((MouseEvent e) => e.preventDefault());
