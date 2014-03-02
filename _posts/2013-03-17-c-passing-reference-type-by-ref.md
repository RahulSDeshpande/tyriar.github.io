---
layout      : post
title       : C# passing a reference type by ref
tags        : [C#]
primarytag  : C#
intro       : You may ask yourself why you would ever want to pass a reference type into a method using the <code>ref</code> keyword, or why the C# compiler even allows this. Using <code>ref</code> on a reference type is actually slightly different to not using it. The difference is that the <code>ref</code> keyword makes it a reference (pointer) to the <em>variable</em>, not just the <em>object</em>. This allows assigning to the source variable of the parameter from within the method.
---

I made a little program to illustrate this:

<!--prettify lang=csharp-->
    class Program
    {
        static void Main(string[] args)
        {
            List<int> listA = new List<int> { 1, 2, 3 };
            List<int> listB = new List<int> { 1, 2, 3 };

            Update(listA);
            UpdateRef(ref listB);

            Console.WriteLine("listA");
            foreach (var val in listA)
                Console.WriteLine(val);

            Console.WriteLine("listB");
            foreach (var val in listB)
                Console.WriteLine(val);
        }

        static void Update(List<int> list)
        {
            list = new List<int>() { 4, 5, 6 };
        }

        static void UpdateRef(ref List<int> list)
        {
            list = new List<int>() { 4, 5, 6 };
        }
    }

Here is the output produced by the program:

<pre><samp>listA
1
2
3
listB
4
5
6</samp></pre>

Notice how `listB` contains the new `List` but `listA` doesn't. This is because we had a reference to the *variable* `listB`.
