---
layout      : post
title       : How to select a HTML table column using jQuery
tags        : [CSS, HTML, JavaScript, jQuery]
primarytag  : jQuery
intro       : Here is a method for selecting a column in a table using the selector <code>:nth-child(n)</code>. You could then do whatever you want to it, like hiding or highlighting it. An example use could be showing that a particular column has been sorted, instead of the more tranditional method of showing some indicator on the header.
---

<!--prettify lang=js-->
    // Highlight column 2
    $('table tr > td:nth-child(2), table tr > th:nth-child(2)')
        .attr('style', 'background-color:#CCF;');

    // Hide column 3
    $('table tr > td:nth-child(3), table tr > th:nth-child(3)')
        .hide();
