---
layout      : post
title       : Enabling USB debugging on your Nexus 10 under Windows
tags        : [Android, Debugging, Google, Java, Windows]
socialimage : /images/2012/11/28/sdk-manager.png
primarytag  : Android
intro       : I just received my new Nexus 10 and am loving it. As usual when it comes to <a href="https://plus.google.com/103459318088659120104/posts/EniD7s5JuT6">setting up Android development</a>, I had a few issues. It was really never the smoothest process in my experience, at least it's nice and smooth for the most part when it's all up and running. Not many relevant results came through so here's how I got it up and running under Windows 8.
---

1. Install the USB drivers using the Android SDK Manager 
  {% include post-image.html class="center-aligned" alt="SDK manager" src="/images/2012/11/28/sdk-manager.png" %}

2. Open Device Manager and update the drivers for the device under "Other Devices" as described [here][2].

Now go have some fun optimising your apps for XHPDI!



[2]: http://developer.android.com/tools/extras/oem-usb.html#Win7