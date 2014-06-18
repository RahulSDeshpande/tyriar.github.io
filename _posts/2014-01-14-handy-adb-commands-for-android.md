---
layout      : post
title       : Handy adb commands for Android
tags        : [Android, Bash]
primarytag  : Android
isfeatured  : 1
preview     : /images/2014/01/14/android.png
socialimage : /images/2014/01/14/android.png
gpluspost   : UbTCVnpf4g2
intro       : Here are some of the commands I find useful for Android's <code>adb</code>. They can be used manually or to automate your build or testing process.
---

{% include post-image.html class="right-col" alt="Android logo" src="/images/2014/01/14/android.png" %}



## View connected device(s)

Use this to view all connected devices and list their IDs.

<!--prettify lang=bash-->
    adb devices

If multiple devices are attached, use `adb -s DEVICE_ID` to target a specific device.



## Install an application

Use the `install` command to install an apk, the optional `-r` argument reinstalls and keeps any data if the application is already installed on the device.

<!--prettify lang=bash-->
    adb install -r APK_FILE

    # example
    adb install -r ~/application.apk



## Uninstall an application

<!--prettify lang=bash-->
    adb uninstall PACKAGE_NAME

    # example
    adb uninstall com.growingwiththeweb.example



## Start an activity

<!--prettify lang=bash-->
    adb shell am start PACKAGE_NAME/ACTIVITY_IN_PACKAGE
    adb shell am start PACKAGE_NAME/FULLY_QUALIFIED_ACTIVITY

    # example
    adb shell am start -n com.growingwiththeweb.example/.MainActivity
    adb shell am start -n com.growingwiththeweb.example/com.growingwiththeweb.example.MainActivity


## Entering the device's shell

<!--prettify lang=bash-->
    adb shell



## Take a screenshot

[Sergei Shvetsov][1] came up with a nice one liner that takes a screenshot with `shell screencap` and outputs it to a local directory using perl. Checkout [his blog][2] for an explanation.

<!--prettify lang=bash-->
    adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screen.png



## Power button

This command sends the power button event to turn the device on or off.

<!--prettify lang=bash-->
    adb shell input keyevent 26



## Unlock screen

This command sends the event that unlocks the lockscreen on the device. It can be combine with the power button command above to turn on and unlock the device.

<!--prettify lang=bash-->
    adb shell input keyevent 82



## Print all installed packages

<!--prettify lang=bash-->
    adb shell pm list packages -f



## Logging

To show the log stream on your command line.

<!--prettify lang=bash-->
    adb logcat

### Filter by tagname

<!--prettify lang=bash-->
    adb logcat -s TAG_NAME
    adb logcat -s TAG_NAME_1 TAG_NAME_2

    #example
    adb logcat -s TEST
    adb logcat -s TEST MYAPP

### Filter by priority

To show logs of a specific priority warning and above.

<!--prettify lang=bash-->
    adb logcat "*:PRIORITY"

    # example
    adb logcat "*:W"

Here are the priority levels:

* `V` - Verbose (lowest priority)
* `D` - Debug
* `I` - Info
* `W` - Warning
* `E` - Error
* `F` - Fatal
* `S` - Silent (highest priority, on which nothing is ever printed)

### Filter by tagname and priority

<!--prettify lang=bash-->
    adb logcat -s TAG_NAME:PRIORITY
    adb logcat -s TAG_NAME_1:PRIORITY TAG_NAME_2:PRIORITY

    #example
    adb logcat -s TEST: W

### Filter using `grep`

Alternatively the output of `logcat` can be piped to `grep` on a system that supports it.

<!--prettify lang=bash-->
    adb logcat | grep "SEARCH_TERM"
    adb logcat | grep "SEARCH_TERM_1\|SEARCH_TERM_2"

    #example
    adb logcat | grep "Exception"
    adb logcat | grep "Exception\|Error"

### Clearing the `logcat` buffer

Use this to clear the buffer to remove any old log data.

<!--prettify lang=bash-->
    adb logcat -c



## Further reading

See more details on the [official `adb` reference site][3].



[1]: https://plus.google.com/113036707377007500168/
[2]: http://blog.shvetsov.com/2013/02/grab-android-screenshot-to-computer-via.html
[3]: http://developer.android.com/tools/help/adb.html
