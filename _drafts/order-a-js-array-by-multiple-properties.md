---
layout      : post
title       : Order a JS array by multiple properties
tags        : [JavaScript]
primarytag  : JavaScript
intro       : This article presents a handy JavaScript snippet that sorts an array of objects using the <code>Array.prototype.sort</code> function.
---

## Snippet

<!--prettify lang=javascript-->
    function orderByProperty(prop) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function (a, b) {
        var equality = a[prop] - b[prop];
        if (equality === 0 && arguments.length > 1) {
          return orderByProperty.apply(null, args)(a, b);
        }
        return equality;
      };
    }

## Usage

<!--prettify lang=javascript-->
    var data = [
      { a: 1, b: 2 },
      { a: 2, b: 3 },
      { a: 2, b: 1 },
      { a: 1, b: 3 },
      { a: 2, b: 2 },
      { a: 1, b: 1 },
    ];

    var sortedData = data.sort(orderByProperty('a', 'b'));

    // sortedData = [
    //   { a: 1, b: 1 },
    //   { a: 1, b: 2 },
    //   { a: 1, b: 3 },
    //   { a: 2, b: 1 },
    //   { a: 2, b: 2 },
    //   { a: 2, b: 3 },
    // ]
