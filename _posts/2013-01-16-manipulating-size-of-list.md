---
layout      : post
title       : Manipulating the size of List&lt;T&gt;
tags        : [.NET, C#, Java, Optimisation]
primarytag  : Optimisation
intro       : .NET allows us to set the size of a <code>List&lt;T&gt;</code> in the constructor if we know the capacity ahead of time. This will save the List's inner (dynamic) array from being reassigned (and copied) when items are added. While usually this will make a minuscule change to your program, if the list is large enough it saves quite a few operations.
---

The capacity constructor runs in \\(O(n)\\) time. Whereas `Add(T)` runs in \\(O(1)\\) time or \\(O(n)\\) time when the capacity needs to be increased.



## How capacity increases

I wrote a simple program to test the `List.Capacity` property. It creates a `List` and adds one million elements to it, printing `List.Capacity` when it changes. Here is the output:

<pre>
0
4
8
16
32
...
65536
131072
262144
524288
1048576
</pre>

As you can see, the list starts with capacity 0, and when the first item is added it creates an array of length 4. Once the list has reached its capacity of 4 it is doubled. Let's look at this in more detail, say that each `Add` is exactly 1 operation and a `Capacity` increase is exactly n operations. This gives:

Capacity not set:<br />
1000000 + 4 + 8 + ... + 523288 + 1048596 = **3097084 operations**

Capacity set:<br />
1000000+ 1000000 = **2000000 operations**



## Releasing unused memory

It's also worth noting that you can specify the `Capacity` property of a `List` that already contains elements. This is useful when bulk adding elements to the `List`. `TrimExcess()` can also be called to reduce the `Capacity` property to `List.Count` if required, say if the estimated size ended up being too big.

Given the above example, imagine we instead wanted to add 1048577 instances of `Int32`. If we created the list by making 1048577 calls to `Add(T)`, that would be 1048575 * `sizeof<Int32>` ~= 32mb wasted memory. A simple call to `TrimExcess()` will free this wasted memory in \\(O(n)\\) time.



## Code

<!--prettify lang=csharp-->
    static void Main(string[] args)
    {
        var = new List<int>();
        int lastCapacity = -1;
        for (int i = 0; i < 1000000; i++)
        {
            if (lastCapacity != list.Capacity)
                Console.WriteLine(list.Capacity);
            lastCapacity = list.Capacity;
            list.Add(1);
        }
        Console.ReadLine();
    }



## In Java

Java's `ArrayList` uses the same dynamic array construct but with a differing initial capacity and capacity increase factor. For Java the capacity starts at 10 and increases at a much slower rate of 50% + 1. In the 1000000 add example above, Java would take 4015851 operations.



## References

- [MSDN - `List<T>(int)`][1]
- [MSDN - List.Add(T)][2]
- [MSDN - List.Capacity][3]
- [MSDN - List.TrimExcess()][4]
- [Java ArrayList source code][5]



[1]: http://msdn.microsoft.com/en-us/library/dw8e0z9z.aspx
[2]: http://msdn.microsoft.com/en-us/library/3wcytfd1.aspx
[3]: http://msdn.microsoft.com/en-us/library/y52x03h2.aspx
[4]: http://msdn.microsoft.com/en-us/library/ms132207.aspx
[5]: http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/util/ArrayList.java