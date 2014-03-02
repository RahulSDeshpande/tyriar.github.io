---
layout      : post
title       : Start using System.Threadng.Tasks.Parallel now!
tags        : [C#, Concurrency]
primarytag  : Concurrency
intro       : If you haven't experienced the power of the <code>System.Threading.Tasks</code> namespace new in .NET 4 you're missing out. This post is about the <code>Parallel</code> class which takes all of the complexity out of the seemingly simple task of running multiple functions in parallel.
---

Before we get into it, it's important to understand understand how the [`Action` generic class][1] works first. An Action is basically a method that returns void.

## Invoke(Action\[\] actions)

With the `Invoke` method you can simply pass in an array of `Action` objects and the method will return once all the `Action`s have completed. 

<!--prettify lang=csharp-->
    Action[] actions = new Action[3];
    actions[0] = () => DoSomething();
    actions[1] = () => DoSomethingElse();
    actions[2] = () => DoSomethingAgain();

    Parallel.Invoke(actions);

The overload of `Invoke`, `Invoke(ParallelOptions parallelOptions, Action[] actions)` allows you to specify some options for the actions. Here are the options:

- `CancellationToken`<br />
  This allows us to exit the operation early
- `MaxDegreeOfParallelism`<br />
  Specifies how many of the actions can be run at one time
- `TaskScheduler`<br />
  Specifies a custom TaskScheduler

<!--prettify lang=csharp-->
    var options = new ParallelOptions()
    {
        MaxDegreeOfParallelism = 20
    };

    Parallel.Invoke(options, actions);

## ParallelLoopResult For(int fromInclusive, int toExclusive, Action&lt;int&gt; body)

The `For` function is just like a regular `for` loop, it takes an `int` to start at, an `int` to run up to and an `Action<int>` to be run on every `int` from start to finish.

<!--prettify lang=csharp-->
    Parallel.For(1, 4, (i) => Console.Write(i));

Possible (non-deterministic) output:

<pre><samp>123
132
213
231
312
321</samp></pre>

There are several overloads that allow specification of options and functions to be run before each iteration.



## ForEach&lt;TSource&gt;(IEnumerable&lt;TSource&gt;, Action&lt;TSource&gt;)

The `ForEach` again is much like the `foreach` loop, a set of data is provided and an Action is run on each of them in parallel.

<!--prettify lang=csharp-->
    var data = new List<string>() { "a", "b", "c" };

    Parallel.ForEach(data, (e) => Console.Write(e));

Possible (non-deterministic) output:

<pre>
abc
acb
bac
bca
cba
cab
</pre>

Just like with `For` there are a number of overloads that allow you to set options and a function to be run before each iteration.

## Be careful

As with any concurrent programming you need to be careful when using objects that are shared between the `Action`s. Any methods or properties that you are using need to be thread-safe, if you're unsure a [quick Google][2] can usually give you the answer. It's probably best to stay away from concurrent programming until you understand how this can go wrong.

I'll give a quick example of what's called a race condition which would result in an exception. Say our two `Action`s are both calling `List<T>.Add(T)` on the object instance of `List`. It is possible that `Add` will throw an `IndexOutOfRangeException` due to what is happening inside the `Add` method. List uses a dynamic array so let's say that it executes something like this:

<pre>
If array.lastIndex &lt; array.capacity
    double array.capacity
array[array.lastIndex] &lt;- newvalue
array.lastIndex &lt;- array.lastIndex + 1
</pre>

Now our two Actions (<var>A<sub>1</sub></var>, <var>A<sub>2</sub></var>) could execute in the following order, resulting in an exception.

<pre>
<var>A<sub>1</sub></var>: If array.lastIndex(2) &lt; array.capacity(3)
<var>A<sub>2</sub></var>: If array.lastIndex(2) &lt; array.capacity(3)
<var>A<sub>2</sub></var>: array[array.lastIndex(2)](null) &lt;- newValue("action2")
<var>A<sub>2</sub></var>: array.lastIndex(2) &lt;- array.lastIndex(2) + 1
<mark><var>A<sub>1</sub></var>: array[array.lastIndex(3)](doesn't exist) &lt;- newValue("action1")</mark>
</pre>

In the above an attempt was made to add to the array in a position that doesn't yet exist because `array.capacity` was never increased. A way to get around race conditions like this is to use `lock`, but that's out of the scope of this post.



[1]: {{site.baseurl}}/2012/08/func-and-action-basics-in-c.html
[2]: https://www.google.com.au/search?q=c%23+is+list.add+thread+safe