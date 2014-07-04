---
layout      : post
title       : Order a JS array by multiple properties
tags        : [JavaScript, Snippet]
primarytag  : JavaScript
draft : 1
intro       : This JavaScript snippet presents a function that returns a function used by <code>Array.prototype.sort</code> to sort an array by multiple properties.
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
