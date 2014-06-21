---
layout      : post
title       : Polymorphism, methods, interfaces and concrete types
tags        : [C#, Stack Exchange]
primarytag  : Stack Exchange
gpluspost   : TRWpsGc2ZbY
intro       : I answered a <a href="http://stackoverflow.com/a/14764827/1156119">question</a> on <a href="http://stackoverflow.com/">Stack Overflow</a> a couple of days ago and it sparked memories of several years ago when I was new to the industry. Something that confused me a little when starting out was around the use of interfaces. All of a sudden they started popping up in mass quantity as I started working on projects of significant size.
---

I wish someone had explained this to me back then. When deciding the parameters and return types of your methods, the parameters should be as abstract as possible and your return type should be as concrete as possible. The reason for this is to enable the most flexibility in your application.

Consider the example given in the SO question,

> Why does <code>[IEnumerable&lt;T&gt;][3].ToList&lt;T&gt;()</code> return [`List<T>`][4] instead of [`IList<T>`][5]?

Returning a concrete `List<T>` that implements `IList<T>` only gives the method consumer *more information*. Given the definition of of `List<T>`

<!--prettify lang=csharp-->
    [SerializableAttribute] public class List<T> : IList<T>, ICollection<T>,
        IList, ICollection, IReadOnlyList<T>, IReadOnlyCollection<T>,
        IEnumerable<T>, IEnumerable

Returning as a `List<T>` gives us the ability to call members on all of these interfaces in addition to on `List<T>` itself. For example we could only use `List.BinarySearch(T)` on a `List<T>`, as it exists in `List<T>` but not in `IList<T>`.

Likewise with parameters, the more abstract they are the more types can be passed in. If we only need to look through a collection of data in no particular order we should use the `IEnumerable<T>` as the parameter type instead of a regular `List<T>` This allows much more flexibility when consuming the method, we could pass in a `List<T>` or a [`SortedSet<T>`][6] or a [`HashSet<T>`][7] etc. as they all implement the `IEnumerable<T>` interface.

In general to maximize the flexibility of our methods, we should **take the most abstract types as parameters** (only the things we're going to use) **and return the least abstract type possible** (to allow a more functional return object).



[3]: http://msdn.microsoft.com/en-us/library/system.collections.ienumerable.aspx
[4]: http://msdn.microsoft.com/en-us/library/6sh2ey19.aspx
[5]: http://msdn.microsoft.com/en-us/library/5y536ey6.aspx
[6]: http://msdn.microsoft.com/en-us/library/dd412070.aspx
[7]: http://msdn.microsoft.com/en-us/library/bb359438.aspx
