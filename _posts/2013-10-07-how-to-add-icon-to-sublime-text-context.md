---
layout      : post
title       : Add an icon to Sublime Text's context menu
tags        : [Sublime Text, Windows]
socialimage : /images/2013/10/07/done.png
primarytag  : Windows
gpluspost   : 9aufccqG8Ym
intro       : Currently the <a href="http://www.sublimetext.com/">Sublime Text</a> installer doesn't add an icon to the 'Open with Sublime Text' context menu that appears when right-clicking a file. I've only recently switched over to Sublime from <a href="http://notepad-plus-plus.org/">Notepad++</a> which does have the icon and it's just a nice thing to have because it allows you to spot it in the menu faster.
---

{% include post-image.html class="center-aligned" alt="No icon" src="/images/2013/10/07/no-icon.png" %}

In order to add the icon we'll need to play around in the registry a bit. I wouldn't recommend proceeding if you aren't confident editing the registry as you can totally screw up your computer if you change the wrong thing. This tutorial was made using Windows 8 but I expect the process is very similar if not identical in Windows Vista and Windows 7.

Here are the steps to add the icon:

1. Open the registry by hitting <kbd><kbd>Start</kbd></kbd> and typing regedit.

    {% include post-image.html class="center-aligned" alt="Regedit" src="/images/2013/10/07/regedit.png" %}

2. Hit <kbd><kbd>Ctrl</kbd>+<kbd>F</kbd></kbd> to open the find dialog and search for 'open with sublime text'.

    {% include post-image.html class="center-aligned" alt="Find" src="/images/2013/10/07/find.png" %}

3. You are looking for a key (folder icon) with the name 'Open with Sublime Text' within `Computer\HKEY_CLASSES_ROOT`, you can see where you are by looking at the status bar in the bottom-left of the window. Hit <kbd><kbd>F3</kbd></kbd> to find the next item matching the search. Mine was located in `Computer\HKEY_CLASSES_ROOT\*\shell\`.

    {% include post-image.html class="center-aligned" alt="Location" src="/images/2013/10/07/location.png" %}

4. Right-click on the key and select New > String Value.

    {% include post-image.html class="center-aligned" alt="New" src="/images/2013/10/07/new.png" %}

5. Name the new string value 'Icon', then double-click on it and enter the path of your Sublime Text executable.

    {% include post-image.html class="center-aligned" alt="Icon added" src="/images/2013/10/07/icon-added.png" %}

6. Close regedit and you should now see the icon in your context menu!

    {% include post-image.html class="center-aligned" alt="Done" src="/images/2013/10/07/done.png" %}
