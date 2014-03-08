---
layout      : post
title       : Button slide down hover effect
tags        : [CSS, Design, Sass]
primarytag  : Design
intro       : Here's a cool little effect that can be applied to buttons/images/etc. on hover, it slides the button down using top/bottom margins and fades the button slightly into the background. Subtle effects like this really add to a web site in my opinion.
---

{% include codepen.html id="BtbDm" height="140" description="Button slide down hover effect" %}

<!--prettify lang=css-->
    button {
      /* Center */
      display:block;
      margin:0 auto;

      /* Button */
      background-color:#484;
      border:0;
      padding:20px;

      /* Text */
      text-transform:uppercase;
      font-weight:bold;
      font-family:Calibri, Arial;
      font-size:150%;
      letter-spacing:2px;
      color:#FFF;

      transition:all .3s ease;
      -o-transition:all .3s ease;
      -moz-transition:all .3s ease;
      -webkit-transition:all .3s ease;

      &:hover {
        $slide-amount:3px;

        cursor:pointer;
        opacity:.85;
        margin-top:$slide-amount;
        margin-bottom:-$slide-amount;
      }
    }
