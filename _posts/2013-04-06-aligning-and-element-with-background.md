---
layout      : post
title       : Aligning and element with background-size:cover
tags        : [CSS, HTML, JavaScript, jQuery]
socialimage : /images/2013/04/06/google.png
primarytag  : CSS
gpluspost   : KccMqZcWiSw
intro       : The CSS property <code>background-size:cover</code> is incredibly useful but due to the nature of it resizing in different directions, it's difficult to pinpoint where a particular part of the image is on the background at any given time. Difficult but not impossible of course.
---

To do this you first need to understand how `background-size:cover` works. Basically the image will fill the screen at all times by stretching out while maintaining aspect ratio. This means that unless the window is perfectly sized to fit the image, either the image is going to be cut off at the top and bottom edges, or the left and right edges.

Given this we can calculate the scale of the image and the x or y offset to find out the actual coordinates of the target location. I've created a little example using Google's logo that positions a red dot inside the red 'o' character. Resizing the window will keep the red dot inside the 'o' no matter how you resize the window.

{% include post-image.html class="full-width" alt="Google logo aligned" src="/images/2013/04/06/google.png" %}

[Demo on jsFiddle][1]

<!--prettify lang=html-->
    <div id="pointer"></div>

<!--prettify lang=css-->
    body {
        background:url(https://www.google.com.au/images/srpr/logo4w.png) no-repeat center center fixed;
        -webkit-background-size:cover;
        -moz-background-size:cover;
        -o-background-size:cover;
        background-size:cover;
    }

    #pointer {
        margin-left:-10px;
        margin-top:-10px;
        width:20px;
        height:20px;
        border-radius:10px;
        background-color:#F00;
        position:fixed;
    }

<!--prettify lang=js-->
    var image = { width: 550, height: 190 };
    var target = { x: 184, y: 88 };

    var pointer = $('#pointer');

    $(document).ready(updatePointer);
    $(window).resize(updatePointer);

    function updatePointer() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        // Get largest dimension increase
        var xScale = windowWidth / image.width;
        var yScale = windowHeight / image.height;
        var scale;
        var yOffset = 0;
        var xOffset = 0;

        if (xScale > yScale) {
            // The image fits perfectly in x axis, stretched in y
            scale = xScale;
            yOffset = (windowHeight - (image.height * scale)) / 2;
        } else {
            // The image fits perfectly in y axis, stretched in x
            scale = yScale;
            xOffset = (windowWidth - (image.width * scale)) / 2;
        }

        pointer.css('top', (target.y) * scale + yOffset);
        pointer.css('left', (target.x) * scale + xOffset);
    }



[1]: http://jsfiddle.net/Tyriar/ypb5P/1/
