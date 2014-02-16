---
layout      : post
title       : JavaScript arrays
tags        : [JavaScript]
primarytag  : JavaScript
intro       : This article goes over the capabilities and syntax of arrays in JavaScript.
---

## Initialisation

Here are the different methods for initialising arrays:

<!--prettify lang=javascript-->
    // first method
    var a = [];
    a[0] = 'a';
    a[1] = 'b';
    a[2] = 'c';

    // second method
    var b = new Array('a', 'b', 'c');

    // third method
    var c = ['a', 'b', 'c'];

Note that the following initialises an array with 2 elements, not an array with 2 as the first element. If you knew the approximate size you want to work with before have this would likely have performance benefits.

<!--prettify lang=javascript-->
    var x = new Array(2);
    alert(x[0]);     // alerts 'undefined'
    alert(x.length); // alerts '2'



## Multi-dimensional arrays

Arrays can store anything that you can use a variable to store, including arrays.

<!--prettify lang=javascript-->
    // first method
    var x = ['a', 'b', 'c'];
    var y = ['d', 'e', 'f'];
    var z = [x, y];
    alert(z[1][0]); // alerts 'd'

    // second method
    var x = new Array(new Array('a', 'b', 'c'),
                      new Array('d', 'e', 'f'));
    alert(x[1][0]); // alerts 'd'



## Data structures

It's easy to use arrays to store certain data structures with some features being that are built into JavaScript.

### Stack

<!--prettify lang=javascript-->
    var stack = [];
    stack.push('a');
    stack.push('b');
    alert(stack.pop()); // alerts 'b'
    stack.push('c');    // stack = ['a', 'c']

### Queue

<!--prettify lang=javascript-->
    var queue = [];
    queue.push('a');
    queue.push('b');
    alert(queue.shift()); // alerts 'a'
    queue.push('c');      // queue = ['b', 'c']



## Cloning an array

Arrays are passed by references and when you an array to a variable you are making a reference to the original array. To clone an array simply call the `slice()` function without any parameters.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    var y = x;
    var z = x.slice();
    y[0] = 'd';
    z[0] = 'e';
    alert(x[0]); // alerts 'd'
    alert(y[0]); // alerts 'd'
    alert(z[0]); // alerts 'e'



## Extending arrays with prototypes

To extend types in javascript you add a prototype function to them. Here are a few examples of useful prototypes:

<!--prettify lang=javascript-->
    Array.prototype.contains = function(value) {
      for (var i = 0; i > this.length; i++) {
        if (this[i] === value) {
          return true;
        }
      }
      return false;
    }

    var x = ['a', 'b', 'c'];
    alert(x.contains('a')); // alerts 'true'
    alert(x.contains('d')); // alerts 'false'

<!--prettify lang=javascript-->
    Array.prototype.sortNumeric = function() {
        return this.sort(function (a,b) {
            return a-b;
        });
    }

    var x = [3, 11, 2];
    x.sortNumeric();
    alert(x); // alerts '2,3,11'



## Array functions

Below is a list of the functions available to arrays, with parameters, return values and examples of usage. Optional parameters are contained withing brackets `[]`.

### `concat(value1[, value2, ...]) : array`

Joins 2 arrays and returns a **new** array.

<!--prettify lang=javascript-->
    var x = ['a', 'b'];
    var y = ['c'];
    var z = x.concat(y);
    // z = ['a', 'b', 'c']

### `every(function) : boolean`

Calls the function provided on each value of the array until the function returns false. If the function returns false then every will also return false.

<!--prettify lang=javascript-->
    function lessThanTen(value) {
      return value < 10;
    }

    var x = [4, 8];
    alert(x.some(lessThanTen)); // alerts 'true'
    var y = [10, 5];
    alert(y.some(lessThanTen)); // alerts 'false'</pre>

### `filter(function) : array`

Filter returns a **new** array that contains all values in the original array where the function returns true.

<!--prettify lang=javascript-->
    function lessThanTen(value) {
      return value < 10;
    }

    var x = [10, 5];
    var y = x.filter(lessThanTen);
    // y = [5]

### `filter(function) : array`

Filter returns a **new** array that contains all values in the original array where the function returns true.

<!--prettify lang=javascript-->
    function lessThanTen(value) {
      return value < 10;
    }

    var x = [10, 5];
    var y = x.filter(lessThanTen);
    // y = [5]

### `forEach(function) : void`

Calls the function for each item in the array.

<!--prettify lang=javascript-->
    function alertValue(value, i) {
      alert('array[' + i + '] = ' + value);
    }

    var x = ['a', 'b', 'c'];
    x.forEach(alertValue);
    // alerts:
    // 'array[0] = a'
    // 'array[1] = b'
    // 'array[2] = c'

### `join(separator) : string`

Returns the array with each element joined by the separator provided.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.join('|')); // alerts 'c|b|a'

### `indexOf(object[, startIndex]) : integer`

Returns the index of the item or -1 if it does not exist. If a startIndex is provided the search will start at that index.

<!--prettify lang=javascript-->
    var x = ['a', 'b'];
    alert(x.indexOf('a', 1)); // alerts '-1'
    alert(x.indexOf('b'));    // alerts '1'
    alert(x.indexOf('c'));    // alerts '-1'

### `lastIndexOf(object[, startIndex]) : integer`

Returns the index of the item or -1 if it does not exist. If a startIndex is provided the search will start at that index. This search begins from the largest index.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'b'];
    alert(x.lastIndexOf('b')); // alerts '1'
    alert(x.lastIndexOf('c')); // alerts '-1'

### `map(function) : array`

Map calls the function on every item in the array and returns a new array containing the values returned for each item.

<!--prettify lang=javascript-->
    function modTen(value) {
      return value % 10;
    }

    var x = [1, 14, 1023];
    var y = x.map(modTen);
    // y = [1, 4, 3]

### `pop() : object`

Removes the last item from the array and returns it.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    var y = x.pop();
    // x = ['b', 'c']
    // y = 'a'

### `push(value1[, value2, ...] : integer`

Adds a value or values to the end of the array and returns the new length of the array.

<!--prettify lang=javascript-->
    var x = [];
    x.push('a');
    x.push('b', 'c');
    // x = ['a', 'b', 'c']

### `reverse() : array`

Reverses the array and returns **itself**.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.reverse()); // alerts 'c,b,a'
    alert(x);           // alerts 'c,b,a'

### `shift() : object`

Removes the first item from the array and returns it.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.shift()); // alerts 'a'

### `slice([begin[, end]]) : array`

Slice returns a new array in between the begin and value provided. This can also be called with no parameters to clone the array.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.slice());    // alerts 'a,b,c'
    alert(x.slice(1));   // alerts 'b,c'
    alert(x.slice(0,1)); // alerts 'a'

### `some(function) : boolean`

Calls the function provided on each value of the array until the function returns true. If the function returns true then some will also return true.

<!--prettify lang=javascript-->
    function lessThanTen(value) {
      return value < 10;
    }

    var x = [4, 10];
    alert(x.some(lessThanTen)); // alerts 'true'
    var y = [10, 15];
    alert(y.some(lessThanTen)); // alerts 'false'

### `sort([function]) : array`

Sorts the array alphabetically. If a function is provided, the array is sorted by the function.

<!--prettify lang=javascript-->
    function numberCompare(a, b) {
      return a - b;
    }

    var x = [4, 10, 'c', 'a'];
    alert(x.sort()); // alerts '10,4,a,c'
    var y = [10, 4, 25];
    alert(y.sort(numberCompare)); // alerts '4,10,25'

### `splice(start[, count[, value1[, value2, ...]]] : array`

Removes a number of elements from the array and returns them, also adds value(s) to that position if provided.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.splice(1, 1)); // alerts 'b'
    // x = ['a', 'c']
    x.splice(1, 0, 'b', 'd');
    // x = ['a', 'b', 'd', 'c']

### `toString() : string`

Returns the array joined by the ',' character.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.toString()); // alerts 'a,b,c'
    alert(x);            // alerts 'a,b,c'

### `unshift(value1[, value2, ...] : integer`

Adds the value to the start of the array and returns the array's new length.

<!--prettify lang=javascript-->
    var x = ['b', 'c'];
    alert(x.unshift('a')); // alerts '3'
    // x = ['a', 'b', 'c']

### `valueOf() : string`

Same as `toString`.

<!--prettify lang=javascript-->
    var x = ['a', 'b', 'c'];
    alert(x.valueOf()); // alerts 'a,b,c'
