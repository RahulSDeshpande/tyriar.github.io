---
layout      : post
title       : A List&lt;T&gt;.BinarySearch extension that takes a lambda expression
tags        : [C#, Extension method, Generics, Searching]
primarytag  : Extension method
intro       : I was thinking the other day how inconvenient it is to use <a href="http://msdn.microsoft.com/en-au/library/ftfdbfx6.aspx"><code>List&lt;T&gt;.BinarySearch</code></a> if you don't want to use the default comparer of <code>T</code>, needing to go and create a new class that implements <code>IComparer&lt;T&gt;</code>. Seems overly messy to require a whole new class just to do the <a href="http://www.growingwiththeweb.com/2012/11/algorithm-binary-search.html">binary search</a>.
---

So I did a little research to see if there was a way around it and found this [Jon Skeet][3] answer (obviously) on StackOverflow. It gives a nice generic class that we can instantiate with a `Comparison` object and pass that into the `BinarySearch` method. I extended Jon's answer to take a lambda expression instead, much like you can do with `List.Sort`.

<!--prettify lang=csharp-->
    public static class ListExtensions
    {
        public static int BinarySearch<T>(this List<T> list,
                                          T item,
                                          Func<T, T, int> compare)
        {
            return list.BinarySearch(item, new ComparisonComparer<T>(compare));
        }
    }

    public class ComparisonComparer<T> : IComparer<T>
    {
        private readonly Comparison<T> comparison;

        public ComparisonComparer(Func<T, T, int> compare)
        {
            if (compare == null)
            {
                throw new ArgumentNullException("comparison");
            }
            comparison = new Comparison<T>(compare);
        }

        public int Compare(T x, T y)
        {
            return comparison(x, y);
        }
    }

    // Usage:

    // ... Fill the list ...
    list.Sort((a, b) => a.IntProp.CompareTo(b.IntProp));
    var item = list[34];
    int index = list.BinarySearch(item, (a, b) => a.IntProp.CompareTo(b.IntProp));
    // index == 34



## Other handy extensions

### Evaluate equality without a second object

<!--prettify lang=csharp-->
    public static int BinarySearch<T>(this List<T> list, Func<T, int> compare)
        where T : class
    {
        Func<T, T, int> newCompare = (a, b) => compare(a);
        return list.BinarySearch((T)null, newCompare);
    }

    // Usage:
    int i = list.BinarySearch(a => a.IntProp == 1);

### Return an object

<!--prettify lang=csharp-->
    public static T BinarySearchOrDefault<T>(this List<T> list,
                                             T item,
                                             Func<T, T, int> compare)
    {
        int i = list.BinarySearch(item, compare);
        if (i >= 0)
            return list[i];
        return default(T);
    }

    // Usage:
    SomeType obj = list.BinarySearchOrDefault(item,
        (a, b) => a.IntProp.CompareTo(b.IntProp));

### Search for multiple matches

This extension will perform the binary search and then scan above and below the matching index for any other objects matching the compare Func. This function will run in \\(O(1)\\) best case (middle of list), \\(O(\log n)\\) average case and \\(O(n)\\) worst case (the entire list matches).

<!--prettify lang=csharp-->
    public static List<int> BinarySearchMultiple<T>(this List<T> list,
                                                    T item,
                                                    Func<T, T, int> compare)
    {
        var results = new List<int>();
        int i = list.BinarySearch(item, compare);
        if (i >= 0)
        {
            results.Add(i);
            int below = i;
            while (--below >= 0)
            {
                int belowIndex = compare(list[below], item);
                if (belowIndex < 0)
                    break;
                results.Add(belowIndex);
            }

            int above = i;
            while (++above < list.Count)
            {
                int aboveIndex = compare(list[above], item);
                if (aboveIndex > 0)
                    break;
                results.Add(aboveIndex);
            }
        }
        return results;
    }

    // Usage:
    List<SomeType> matches = list.BinarySearchMultiple(item,
        (a, b) => a.IntProp.CompareTo(b.IntProp));



[3]: http://stackoverflow.com/a/8405872/1156119