---
layout      : post
title       : Merging Dictionary objects
tags        : [.NET, C#, Extension method, LINQ]
primarytag  : Extension method
intro       : Say you have two (or more) <code>Dictionary</code> objects and want their contents merged, this can be done with LINQ very conveniently like so.
---

<!--prettify lang=csharp-->
    var mergedDictionary = dictionaries
        .SelectMany(e => e)
        .ToLookup(e => e.Key, e => e.Value)
        .ToDictionary(e => e.Key, e => e.First());

There is a major issue with this method though in that it's quite horrible performance-wise, the reason being because of the amount of conversions and unnecessary work that is happening. Firstly `SelectMany` is flattening the `IEnumerables` into a single `IEnumerable`, then we're converting the new `IEnumerable` into a `Lookup` and then we're converting the `Lookup` into a `Dictionary` taking only the first value for any key in the `Lookup` to resolve duplicates.

This is one of the problems with LINQ, everything is so simple and easy to use, but if you don't understand what is going on then a LINQ query can have a serious hit on the performance of an algorithm.

The way I would go about it would be to create an extension method on `Dictionary<TKey, TValue>` and loop through each Dictionary and value, merging it in if the key doesn't exist in the source `Dictionary`.

<!--prettify lang=csharp-->
    public static class DictionaryExtensionMethods
    {
        public static void MergeIn<TKey, TValue>(
            this Dictionary<TKey, TValue> main,
            params Dictionary<TKey, TValue>[] dictionaries)
        {
            foreach (var dictionary in dictionaries)
            {
                foreach (var item in dictionary)
                {
                    if (!main.ContainsKey(item.Key))
                    {
                        main[item.Key] = item.Value;
                    }
                }
            }
        }
    }

This method doesn't create a new `Dictionary` but rather merges everything in to it, it would be very easy to modify this to a method that returns a new `Dictionary`.

<!--prettify lang=csharp-->
    public static Dictionary<TKey, TValue> MergeIn<TKey, TValue>(
        params Dictionary<TKey, TValue>[] dictionaries)
    {
        var result = new Dictionary<TKey, TValue>();
        foreach (var dictionary in dictionaries)
        {
            foreach (var item in dictionary)
            {
                if (!result.ContainsKey(item.Key))
                {
                    result[item.Key] = item.Value;
                }
            }
        }
        return result;
    }
