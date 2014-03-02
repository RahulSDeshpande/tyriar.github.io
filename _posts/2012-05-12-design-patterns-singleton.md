---
layout      : post
title       : Singleton design pattern
tags        : [C#, Concurrency, Creational design pattern, Design pattern, Software engineering, UML]
socialimage : /images/2012/05/12/preview.svg
primarytag  : Design pattern
intro       : The singleton design pattern enables easy access to a single instance of a class.
---

**Benefits**

- Makes it very easy to get a single instance of an object globally

**Drawbacks**

- They are effectively just globals, this is not object-oriented design
- Can cause concurrency issues if not the singleton is not thread-safe
- Can make code hard to follow
- Makes unit testing more difficult

From the looks of the benefits and drawbacks you would wonder why you would use a singleton at all, a lot of people even consider it an anti-pattern. My answer to that question is that you should only use this pattern very sparingly and preferably not at all in large projects. You can however save yourself quite a bit of time using them in small projects.



## UML diagram

Note the *private* constructor.

{% include post-image.html class="center-aligned" alt="Singleton UML diagram" src="/images/2012/05/12/singleton-uml.svg" %}



## Code examples

[View on GitHub][2]

### Traditional singleton

<!--prettify lang=csharp-->
    public class Singleton
    {
        private static Singleton _instance = new Singleton();

        private Singleton() { }

        public static Singleton Instance
        {
            get { return _instance; }
        }
    }

### Singleton with [lazy loading][1]

<!--prettify lang=csharp-->
    public class LazyLoadingSingleton
    {
        private static LazyLoadingSingleton _instance;

        private LazyLoadingSingleton() { }

        public static LazyLoadingSingleton Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new LazyLoadingSingleton();

                return _instance;
            }
        }
    }



## Usage examples

Some common uses of the Singleton design pattern are:

- Caches
- Handling user preferences
- Factory or builder classes



[1]: {{site.baseurl}}/2012/04/design-patterns-introduction-and-lazy.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/singleton
