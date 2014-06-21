---
layout      : post
title       : What data structures the .NET collections use
tags        : [C#, Generics, Optimisation]
isfeatured  : 1
preview     : /images/2013/02/24/logo.png
socialimage : /images/2013/02/24/logo.png
primarytag  : C#
gpluspost   : K7PDk7jDcav
intro       : I've compiled some information about time complexity and underlying data structures of .NET simple collections and dictionaries. It was difficult to find some of this information on official sources like MSDN and non-official sources seemed to differ, so I used reflector and actually had a look at the .NET framework code to confirm these cases.
---



## Simple collections

| Type                | Data structure      | Notes
| ------------------- | ------------------- | -----
| [`List<T>`][1]      | Array               | A regular list using a dynamic array
| [`SortedSet<T>`][2] | [Red-black tree][3] | A list stored using a red-black tree

### Complexity

| Type        | Get (`[i]`) | Find            | Add             | Insert          | Remove
| ----------- | ----------- | --------------- | --------------- | --------------- | ---------------
| `List`      | \\(O(1)\\)  | \\(O(n)\\)      | \\(O(1)\\)\*     | \\(O(n)\\)      | \\(O(n)\\)
| `SortedSet` | N/A         | \\(O(\log n)\\) | \\(O(\log n)\\) | \\(O(\log n)\\) | \\(O(\log n)\\)

\* *`List.Add` is \\(O(n)\\) when adding beyond the array's capacity*



## Dictionaries

Dictionaries or hash tables are ideal when you either need to access the data via an arbitrary key or you need fast deletion and insertion. Note that this section doesn't the [`Lookup`][4] class which stores a *collection* of items against a key.

| Type                                  | Data structure      | Notes
| ------------------------------------- | ------------------- | -----
| [`HashSet<T>`][5]                     | Hash table          | A hash table where the key is the object itself
| [`Dictionary<TKey, TValue>`][6]       | Hash table          | A hash table using a key not necessarily on the object being stored
| [`SortedList<TKey, TValue>`][7]       | Array               | The same as `Dictionary` only items and their keys are stored sorted arrays
| [`SortedDictionary<TKey, TValue>`][8] | [Red-black tree][3] | The same as `Dictionary` only items and their keys are stored in a red-black tree. Uses `SortedSet` behind the scenes

### Complexity

| Type               | Find by key     | Remove          | Add
| ------------------ | --------------- | --------------- | ---------------
| `HashSet`          | \\(O(1)\\)\*     | \\(O(1)\\)\*     | \\(O(1)\\)\*\*
| `Dictionary`       | \\(O(1)\\)\*     | \\(O(1)\\)\*     | \\(O(1)\\)\*\*
| `SortedList`       | \\(O(\log n)\\) | \\(O(n)\\)      | \\(O(n)\\)
| `SortedDictionary` | \\(O(\log n)\\) | \\(O(\log n)\\) | \\(O(\log n)\\)

\* *\\(O(n)\\) with collision*<br />
\*\* *\\(O(n)\\) with collision or when adding beyond the array's capacity*

### `SortedList` vs `SortedDictionary`

`SortedList` and `SortedDictionary` are best used when you need order to the items that you're storing. Here is a pretty detailed comparison from Microsoft:

> The `SortedList<TKey, TValue>` generic class is an array of key/value pairs with \\(O(\log n)\\) retrieval, where \\(n\\) is the number of elements in the dictionary. In this, it is similar to the `SortedDictionary<TKey, TValue>` generic class. The two classes have similar object models, and both have \\(O(\log n)\\) retrieval. Where the two classes differ is in memory use and speed of insertion and removal:
>
> - `SortedList<TKey, TValue>` uses less memory than `SortedDictionary<TKey, TValue>`.
> - `SortedDictionary<TKey, TValue>` has faster insertion and removal operations for unsorted data, \\(O(\log n)\\) as opposed to \\(O(n)\\) for `SortedList<TKey, TValue>`.
> - If the list is populated all at once from sorted data, `SortedList<TKey, TValue>` is faster than `SortedDictionary<TKey, TValue>`.
>
> Another difference between the `SortedDictionary<TKey, TValue>` and `SortedList<TKey, TValue>` classes is that `SortedList<TKey, TValue>` supports efficient indexed retrieval of keys and values through the collections returned by the Keys and Values properties. It is not necessary to regenerate the lists when the properties are accessed, because the lists are just wrappers for the internal arrays of keys and values.
>
> <footer><cite><a href="http://msdn.microsoft.com/en-us/library/ms132319.aspx">MSDN - <code>SortedList</code></a></cite>, Microsoft</footer>



## References

- [MSDN - `List<T>`][1]
- [MSDN - `SortedSet<T>`][2]
- [MSDN - `HashSet<T>`][5]
- [MSDN - `Dictionary<TKey, TValue>`][6]
- [MSDN - `SortedList<TKey, TValue>`][7]
- [MSDN - `SortedDictionary<TKey, TValue>`][8]



[1]: http://msdn.microsoft.com/en-us/library/6sh2ey19.aspx
[2]: http://msdn.microsoft.com/en-us/library/dd412070.aspx
[3]: {{site.baseurl}}/2012/12/data-structure-red-black-tree.html
[4]: http://msdn.microsoft.com/en-us/library/bb460184.aspx
[5]: http://msdn.microsoft.com/en-us/library/bb359438.aspx
[6]: http://msdn.microsoft.com/en-au/library/xfhwa508.aspx
[7]: http://msdn.microsoft.com/en-us/library/ms132319.aspx
[8]: http://msdn.microsoft.com/en-us/library/f7fta44c.aspx
