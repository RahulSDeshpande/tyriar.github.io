---
layout      : post
title       : Touch != Click
tags        : [Android]
socialimage : /images/2012/04/28/pinch.png
primarytag  : Android
intro       : I started programming for Android a few months ago, starting a few apps while playing around with the API, re-familiarising myself with Java and getting a feel for mobile development. Having spent the majority of my programming time during the last couple of years using WinForms, ASP.NET and other Microsoft technologies, I've really enjoyed breaking out and trying something new.
---

When moving from using a mouse and keyboard for all input to using your finger and a soft-keyboard for the first time, there are a few things that you need to learn until you can take full advantage of the OS.



## No more hover

There is no hover for touchscreens, unless of course [these][1] become the norm. You can simulate hover in a mobile browser by long pressing but of course it isn't the same.



## Less control

Unfortunately, your fat fingers are not as accurate as that small cursor. Your buttons will generally have to be a bit larger when developing for touch. The [Android design guidelines][2] recommend making your buttons at least 48dp ([density-independent pixel][3]) which translates to approximately 9mm, in order to offset any inaccuracy. I find that I very rarely miss touching a button if it is 48dp or larger.

You must also be mindful of the touch areas of your widgets. This is where memorising the difference between padding and margin is useful, padding with *make the widget larger* whereas margin will just *put space around the widget*.



## Gestures

Today's average mouse has one cursor and 3 buttons, a hand has 10 fingers. In order to perform a large number of actions without resorting to a bunch of action lists we need to employ the use of some multi-touch gestures. These are an input mechanism for touch screen devices, whenever you touch or interact with a touch screen device you are performing a multi-touch gesture.

### Single tap

The most basic gesture, simply tap the screen.

{% include post-image.html class="center-aligned" alt="Single tap" src="/images/2012/04/28/single-tap.png" %}

### Double tap

Tap the screen twice in quick succession. When using this gesture you need to make sure that it can follow the action that occurs when you do a single tap, as that will be triggered before the double tap completes. An example of this not working is if the single tap gesture sends the user to another screen, the user will not be able to complete the double tap.

{% include post-image.html class="center-aligned" alt="Double tap" src="/images/2012/04/28/double-tap.png" %}

### Long press

Touching the screen and holding for 1-2 seconds, the long press event is often accompanied by a vibrate to indicate that the gesture is complete. This has sort of become like the right mouse button, often invoking a contextual menu.

{% include post-image.html class="center-aligned" alt="Long press" src="/images/2012/04/28/long-press.png" %}

### Pinch

Often called pinch zoom, this gesture typically invokes a zoom out function. Place 2 fingers on the screen and move them towards each other, the term pinch zoom often refers to the inverse gesture also reverse-pinch. The basic idea of these gestures is that 2 fingers are placed on the screen and where ever you move them, the same location of the view will stay under you finger.

{% include post-image.html class="center-aligned" alt="Pinch" src="/images/2012/04/28/pinch.png" %}

### Rotate

Place 2 fingers on the screen and rotate them around as if you're drawing a circle. Rotate is often used in conjunction with pinch so that the user can completely manipulate a 2 dimensional view. [Google Maps][4] is a great example of pinch and rotate working together.

{% include post-image.html class="center-aligned" alt="Rotate" src="/images/2012/04/28/rotate.png" %}

### Scroll

Scrolling can be done by touching, holding and then moving your finger around the screen. If you wait too long before moving then the long press gesture will trigger. There is a small distance that your finger needs to travel in order to indicate that it is not a long press, this distance would depend on the device/OS.

{% include post-image.html class="center-aligned" alt="Scroll" src="/images/2012/04/28/scroll.png" %}

### Fling

The fling gesture is triggered when the scroll gesture is active and you lift your finger while it is still moving. This is often used in lists so that the user can scroll past many items easily by flinging quickly.

{% include post-image.html class="center-aligned" alt="fling" src="/images/2012/04/28/fling.png" %}

## Annoying software keyboard
You need to also be aware of when the soft-keyboard will be activated. You will usually need to explicitly tell the application to not show the soft-keyboard when you change screens if they contain widgets, if this is undesired behaviour.



[1]: http://www.theverge.com/2012/3/23/2897545/a-first-look-at-the-sony-xperia-sola-floating-touch-display
[2]: http://developer.android.com/design/style/metrics-grids.html
[3]: http://developer.android.com/guide/practices/screens_support.html
[4]: https://play.google.com/store/apps/details?id=com.google.android.apps.maps