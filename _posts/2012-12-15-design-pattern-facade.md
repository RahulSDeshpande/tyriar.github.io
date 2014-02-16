---
layout      : post
title       : Facade design pattern
tags        : [Behavioural design pattern, Design pattern, Java, Software engineering, UML]
socialimage : /images/2012/12/15/preview.png
primarytag  : Design pattern
intro       : The facade design pattern is a very simple pattern that provides a simplified interface to other code that may not be structured the same way.
---

If we look facade up in the dictionary, this is one of the definitions we get:

> An outward appearance that is maintained to conceal a less pleasant or creditable reality.
>
> <footer><cite>Google dictionary</cite></footer>

This is the primary purpose of the pattern; to conceal a piece of code that isn't very nice to use and replace it with something better. That's all it is really, a class that calls code elsewhere.

**Benefits**

- Can change a badly-designed or hard to use API into an easy to use API
- Can merge multiple APIs into a single API
- If all calls to a function are done through a facade then it is very easy to refactor

**Drawbacks**

- Could possibly add unnecessary complexity if overused or used incorrectly



## UML diagram

{% include post-image.html class="center-aligned" alt="Facade UML diagram" src="/images/2012/12/15/facade-uml.svg" %}



## Code example

[View on GitHub][4]

<!--prettify lang=java-->
    public class FacadeClient {
        public static void main(String[] args) {
            Facade facade = new Facade();
            facade.doSomething();
        }
    }

    public class Facade {
        private Class1 class1;
        private Class2 class2;

        public Facade() {
            class1 = new Class1();
            class2 = new Class2();
        }

        public void doSomething() {
            class1.doSomething();
            class2.doSomething();
        }
    }

    public class Class1 {
        public void doSomething() {
            // ...
        }
    }

    public class Class2 {
        public void doSomething() {
            // ...
        }
    }



## Usage examples

- Creating a single consolidated API out of multiple, for example a `FastSorter` class (the facade) that exposes the functionality of the [`Quicksort`][1], [`Merge sort`][2] and [`Heapsort`][3] classes I created in recent posts.
- Simplifying an overly-complex and difficult to use graphics API into a simplified version only containing the functions required for the application.



[1]: {{site.baseurl}}/2012/12/algorithm-quicksort.html
[2]: {{site.baseurl}}/2012/11/algorithm-merge-sort.html
[3]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
[4]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/facade

[Facade UML diagram]: https://googledrive.com/host/0B-wUQaw640vCcmp6Qko2V2dUcW8
