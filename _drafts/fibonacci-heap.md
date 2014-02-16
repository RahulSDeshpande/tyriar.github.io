---
layout      : post
title       : Fibonacci heap
tags        : [Computer science, Data structure, Generics, Java]
socialimage : 
primarytag  : Data structure
intro       : A Fibonacci heap is priority queue data structure that is similar to the binomial heap but with several modifications and a looser structure. The main hallmark of the Fibonacci heap is that it defers 'clean up' operations to be done at a point where they are more convenient, guaranteeing \(&Theta;(1)\) for several operations. Due to these deferred clean up steps, the worst case time complexity of the delete and extract minimum operations is \(O(n)\), however they turn out to be \(O(\log n)\) amortised.
---

The Fibonacci heap was designed in order to improve Dijkstra's shortest path algorithm from \\(O(E \log V)\\) to \\(O(E + V log V\\) (CONFIRM) by optimising the operations used most by the algorithm.

Its name derives from the fact that the Fibonacci sequence is used in its complexity analysis.



## Time complexity

************************* Check decrease key, delete and extract min worst case *************************

| Operation       | Description                                                             | Complexity                 |
|-----------------|-------------------------------------------------------------------------|----------------------------|
| Decrease key    | Decreases an existing key to some value                                 | \\(&Theta;(1)\\)\* |
| Delete          | Deletes a node given a reference to **the node**                        | \\(O(\log n)\\)\*  |

| Extract minimum | Removes and returns the minimum value given a reference to **the node** | \\(O(\log n)\\)\*  |

| Find minimum    | Returns the minimum value                                               | \\(&Theta;(1)\\)           |

| Insert          | Inserts a new value                                                     | \\(&Theta;(1)\\)           |
| Union           | Combine the heap with another to form a valid binomial heap             | \\(&Theta;(1)\\)           |

\* *Amortised*




## Structure



## Operations

### Decrease key



### Delete



### Extract minimum



### Find minimum



### Insert



### Union



## Code

<pre class="prettyprint lang-java">
</pre>




## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford






Priority queue implementation, like binary heap
Original motivation: improve Dijkstra's shortest path algorithm from O(E log V) to O(E + V log V)
Similar to binomial heaps, but less rigid structure.
Name comes from the fibonacci sequence being used in the time complexity analysis





http://www.cs.princeton.edu/~wayne/teaching/fibonacci-heap.pdf
http://en.wikipedia.org/wiki/Fibonacci_heap
http://stackoverflow.com/questions/19508526/what-is-the-intuition-behind-the-fibonacci-heap-data-structure
