---
layout      : post
title       : Creating custom objects in JavaScript
tags        : [JavaScript]
primarytag  : JavaScript
intro       : I always assumed JavaScript had the ability to create custom objects but only bothered learning how to do so recently. Turns out it's incredibly easy to create custom "objects" with parameters.
---

<!--prettify lang=js-->
    function CustomObject(a, b) {
      this.a = a;
      this.b = b;
      this.c = a + b;
      this.print = printParams;
    }

    function printParams() {
      alert(this.a + ',' + this.b + ',' + this.c);
    }

    var obj = new CustomObject(2, 3);
    obj.print();