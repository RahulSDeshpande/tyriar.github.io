---
layout      : post
title       : Dart, my first steps
tags        : [Dart, JavaScript, My projects]
primarytag  : Dart
intro       : A couple of weeks ago I jumped in to Dart with a little project to learn the language; to convert my <a href="http://www.growingwiththeweb.com/p/html5-demo.html">canvas-astar.js</a> project. I'm glad to say that what Google claims is true, since Dart borrows syntax from some common languages, it's very easy for the seasoned developer to learn. It took me around an hour of studying and then an hour of porting to get it in the state that it is.
---

## JavaScript &rarr; Dart

Much of the JavaScript actually turned out to be valid Dart as well, this makes porting a JavaScript application to Dart dead simple. I went the statically-typed route which took a little longer but it was a very quick and easy process.

## Syntax

I instantly fell in love with Dart's syntax, it's like they cherry picked the best from a bunch of different languages and then added some of their own awesomeness. Here are some of my favourites.

### Constructor parameters

Constructors can set properties on the class right in the parameter list, no more `this.prop = prop` with this elegant syntax. 

<!--prettify lang=dart-->
    class MyClass {
      int prop1;
      int prop2;

      MyClass(this.prop1, this.prop2);
    }

### Inline functions

It makes everything so much easier not having to type out `function () {}` every time I want an inline function. 

<!--prettify lang=dart-->
    () => window.alert('test');
    (arg1, arg2) => arg1.prop = arg2.prop;

### Operator overloading

Dart supports operator overloading much like C#. (come on Java!)

<!--prettify lang=dart-->
    operator==(MyClass o) => id == o.id

### Chaining

Dart supports chaining just like jQuery.

<!--prettify lang=dart-->
    elem
      ..text = "test"
      ..id = "something"

## Road blocks

Naturally there were a few stumbles, here are some things that slowed me down a little.

### String concatenation

I stumbled a little trying to figure out how to nicely concatenate strings. While the subject is [right at the beginning][2] of the Dart cookbook, I ran through the [tutorials][3] which doesn't cover string interpolation. Turns out it's pretty nice. 

<!--prettify lang=dart-->
    var info = 'Map size = ${width}x${height}'
               'Total number of nodes = ${width * height}'
               'Number of nodes in open list = ${open.length}'
               'Number of nodes in closed list = ${closed.length}';

### 2d arrays

After enjoying all this syntactic sugar I was a little surprised to find that there was no 2 dimension array implementation. It took no time at all to implement my own though:

<!--prettify lang=dart-->
    /* 
     * canvas-astar.dart
     * MIT licensed
     *
     * Created by Daniel Imms, http://www.growingwiththeweb.com
     */
    class Array2d<T> {
      List<List<T>> array;
      T defaultValue = null;
      
      Array2d(int width, int height, {T this.defaultValue}) {
        array = new List<List<T>>();
        this.width = width;
        this.height = height;
      }
      
      operator [](int x) => array[x];
      
      void set width(int v) {
        while (array.length > v)
          array.removeLast();
        while (array.length < v) {
          List<T> newList = new List<T>();
          if (array.length > 0) {
            for (int y = 0; y < array.first.length; y++)
              newList.add(defaultValue);
          }
          array.add(newList);
        }
      }
      
      void set height(int v) {
        while (array.first.length > v) {
          for (int x = 0; x < array.length; x++)
            array[x].removeLast();
        }
        while (array.first.length < v) {
          for (int x = 0; x < array.length; x++)
            array[x].add(defaultValue);
        }
      }
    }

## Code

You can check the rest of the code out if you're interested at [GitHub][4], it's a bit rough around the edges still but it works :)



[2]: http://www.dartlang.org/docs/cookbook/?utm_source=site&utm_medium=footer&utm_campaign=homepage#concatenating-strings
[3]: http://www.dartlang.org/docs/tutorials/
[4]: https://github.com/Tyriar/canvas-astar.dart