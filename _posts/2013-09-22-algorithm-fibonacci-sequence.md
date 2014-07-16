---
layout      : post
title       : The Fibonacci sequence
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
gpluspost   : ZLPFHnJkNDr
intro       : This article looks at the interview question - <em>Implement a function that returns the Fibonnaci number for a given integer input.</em>
---

## Analysis

The Fibonacci sequence is the recurrence defined as

$$f(n) = f(n - 1) + f(n - 2)$$
$$\text{where }f(0) = 0\text{ and }f(1) = 1$$

Or in simpler terms, it's the sequence of numbers starting with 0 and 1 that is constructed by adding the previous 2 numbers together. Here are numbers 0 through 15:

> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, ...

### Recursive

A sequence of numbers that can be defined with a recurrence can be very easily translated into a recursive function. Remember though that while the solution may be elegant, it can also be unsuitable if the input is sufficiently large. Many recursive calls quickly add up and can lead to a stack overflow exception.

A primitive solution to give the Fibonnaci number for a particular input is to simply define the base cases (\\(f(0)\\) and \\(f(1)\\)) and then call into itself. The major flaw with this is that calling \\(f(10)\\) will call \\(f(9)\\) and \\(f(8)\\) which in turn will \\(f(8)\\), \\(f(7)\\), \\(f(7)\\) and \\(f(6)\\), and so on... At each call we are doubling the amount of work to be done (ie. it's growing  exponentially), most of which has already been done.

This function can be optimised by applying dynamic programming to the solution, which is basically a fancy name for caching results from smaller problems and using them to solve a bigger problem. So when \\(f(x)\\) is called we will store the result before returning it, so when it is called again with the same input there is no need to recurse all the way down to \\(f(0)\\) and \\(f(1)\\) again.

### Iterative

For an iterative solution, the function can keep track of two numbers starting with \\(f(0)\\) and \\(f(1)\\), then iterate over them, continually incrementing their input numbers each iteration until the number is found. So the first time through the loop we swap the first value \\(f(0)\\) with the second (\\(f(1)\\)), and then set the second value to the original value in first and second (\\(f(0) + f(1)\\)), which would result in the values \\(f(1)\\) and \\(f(2)\\).



## Pseudocode

### Recursive

<pre>
fib(n)
  if (n &lt; 0)
    throw
  if (n == 0)
    return 0
  if (n == 1)
    return 1
  return fib(n-1) + fib(n-2)

fib-v2(n)
  if (n &lt; 0)
    throw
  if (n == 0)
    return 0
  if (n == 1)
    return 1
  if (n in hashtable)
    return hashtable[n]

  value &larr; fib-v2(n-1) + fib-v2(n-2)
  store value in hashtable
  return value
</pre>

### Iterative

<pre>
fib-iter(n)
  if (n &lt; 0)
    throw
  if (n == 0)
    return 0
  if (n == 1)
    return 1

  first &larr; 0
  second &larr; 1
  counter &larr; 1

  while counter &lt; n
    temp &larr; first
    first &larr; second
    second &larr; temp + first
    counter &larr; counter + 1

  return second
</pre>



## Complexity

The original recursive function is exponential \\(O(n^2)\\), while the enhanced recursive solution and the iterative solution both run in linear time \\(O(n)\\).

## Code

[View on GitHub][1].

<!--prettify lang=java-->
    public static int fib(int n) {
        if (n < 0)
            throw new IllegalArgumentException("n much be >= 0");
        if (n == 0)
            return 0;
        if (n == 1)
            return 1;

        return fib(n - 1) + fib(n - 2);
    }

<!--prettify lang=java-->
    public static int fibV2(int n) {
        return fibV2(n, new HashMap<Integer, Integer>());
    }

    private static int fibV2(int n, HashMap<Integer, Integer> hash) {
        if (n < 0)
            throw new IllegalArgumentException("n much be >= 0");
        if (n == 0)
            return 0;
        if (n == 1)
            return 1;
        if (hash.containsKey(n))
            return hash.get(n);

        int value = fibV2(n - 1, hash) + fibV2(n - 2, hash);
        hash.put(n, value);
        return value;
    }

<!--prettify lang=java-->
    public static int fibIter(int n) {
        if (n < 0)
            throw new IllegalArgumentException("n much be >= 0");
        if (n == 0)
            return 0;
        if (n == 1)
            return 1;

        int first = 0;
        int second = 1;
        int counter = 1;
        int temp;

        while (counter < n) {
            temp = first;
            first = second;
            second = temp + first;
            counter++;
        }

        return second;
    }



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/fibonacci-sequence
