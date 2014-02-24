---
layout      : post
title       : Big-O notation
tags        : [Algorithm, Computer science, Java, Optimisation]
primarytag  : Computer science
intro       : This article looks at the definition of Big-\(O\) notation, how it works and provides some code examples of different Big-\(O\) time complexities.
---

## Introduction

Big-\\(O\\) notation (pronounced 'Big Oh') is used in computer science as a means to describe the worst-case performance of an algorithm. It's one of the things you really should learn if you're interested at all in designing efficient algorithms.

The formal definition is as follows:

> \\(f(n) = O(g(n))\\) means \\(cg(n)\\) is an upper bound on \\(f(n)\\). Thus there exists some constant \\(c\\) such that \\(f(n)\\) is always \\(&le; cg(n)\\), for large enough \\(n\\) (i.e. , \\(n &ge; n_0\\) for some constant \\(n_0\\)).
>
> <cite>The Algorithm Design Manual</cite>, Steven S. Skiena

This definition is a very formal way of saying that Big-\\(O\\) notation is the upper-bound/worst-case of a function.



## Worst-case

Big-\\(O\\) notation has a counterpart \\(&Omega;\\)-notation (Big Omega notation), which describes the best-case instead of the worst-case. While it may seem unintuitive, this is actually much less useful when analysing performance issues. In general we care much more about the worst-case performance as we want everything to run as smooth as possible, not randomly fast and randomly slow. Consider the following function:

<!--prettify lang=java-->
    public Boolean doesTextContainChar(String text, char character) {
      for (int i = 0; i < text.length(); i++) {
        if (text.charAt(i) == character) {
          return true;
        }
      }
      return false;
    }

If we run this function when `text` is very small or when `character` is near the beginning of `text` then it will run very quickly. But what about when `text` is extremely long and `character` doesn't exist? This is the worst-case of the algorithm.



## Simplicity

Big-\\(O\\) notation ignores the details of an algorithm and focuses only on the largest power in the term. A precise analysis of an algorithm could look something like this:

$$f(n) = 3n^3 + 60n^2 + 8n + 103$$

The beauty of Big-\\(O\\) notation is that we can ignore most of this and just focus on the largest term. We can even ignore the constant, consider the same algorithm written in a low-level language runs 3 times faster than when written in a high-level language, it's a detail that isn't really important when looking at the algorithm itself. So the function above in Big-\\(O\\) notation is

$$f(n) = O(n^{3})$$



## \\(O(1)\\)

An \\(O(1)\\) function always runs in the same time regardless of the input size.

<!--prettify lang=java-->
    public Boolean isCharCaps(char character) {
      int asciiCode = (int)character;
      return asciiCode >= 65 && asciiCode <= 90;
    }



## \\(O(\log n)\\)

An \\(O(\log n)\\) function grows at a rate of the logarithm (base 2) of the input size. A lot of sorted array search algorithms like the binary search algorithm are \\(O(\log n)\\). This is only really possible when you can ignore input elements entirely.

<!--prettify lang=java-->
    public Boolean binarySearch(int[] sortedArray, int value, int min, int max) {
      if (max < min)
        return false;
      else {
        int mid = (min + max) / 2;

        if (sortedArray[mid] > value)
          return BinarySearch(sortedArray, value, min, mid-1);
        else if (sortedArray[mid] < value)
          return BinarySearch(sortedArray, value, mid+1, max);
        else
          return true;
      }
    }



## \\(O(n)\\)

An \\(O(n)\\) function grows at the same rate as the input size.

<!--prettify lang=java-->
    public Boolean doesTextContainChar(String text, char character) {
      for (int i = 0; i < text.length(); i++) {
        if (text.charAt(i) == character) {
          return true;
        }
      }
      return false;
    }



## \\(O(n^2)\\)

An \\(O(n^2)\\) function grows at a rate of input size to the power of 2.

<!--prettify lang=java-->
    public static int[] insertionSort(int[] array) {
      for (int i = 1; i < array.length; i++) {
        int item = array[i];
        int indexHole = i;
        while (indexHole > 0 && array[indexHole - 1] > item) {
          array[indexHole] = array[--indexHole];
        }
        array[indexHole] = item;
      }
      return array;
    }

More information on insertion sort can be found [here][1].



## \\(O(2^n)\\)

An \\(O(2^n)\\) function's time doubles whenever the input grows. If your function is \\(O(2^n)\\) it's going to really struggle when the size of your input data increases even a little. Writing one would make me feel a little icky.



[1]: {{site.baseurl}}/2012/11/algorithm-insertion-sort.html