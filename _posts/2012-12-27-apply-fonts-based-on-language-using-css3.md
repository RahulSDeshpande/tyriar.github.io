---
layout      : post
title       : Apply fonts based on language using CSS3
tags        : [CSS, Natural language]
primarytag  : CSS
intro       : You can apply fonts based on unicode character codes using the <code>unicode-range</code> CSS3 rule. Fonts with a <code>unicode-range</code> rule will only target the specified range and fall back to other fonts with characters not in the range. Multiple ranges can be used by separating them with a comma.
---

<!--prettify lang=css-->
    @font-face {
      font-family: FancyJapanese;
      src: local('KaiTi');
      unicode-range: U+4E00-9FBF, U+3040-30FF;
    }
    @font-face {
      font-family: FancyKorean;
      src: local('Batang');
      unicode-range: U+AC00-D7AF;
    }
    .fancy {
      font-family: FancyJapanese, FancyKorean, "Times New Roman", Times, serif;
    }

{% include codepen.html id="vhuwB" height="178" description="Apply fonts based on language using CSS3" %}
