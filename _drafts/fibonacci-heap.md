---
layout      : post
title       : Fibonacci heap
tags        : [Computer science, Data structure, Generics, Java]
socialimage : 
primarytag  : Data structure
intro       : A Fibonacci heap is a heap data structure similar to the [binomial heap][1] only with several modifications and a looser structure. The main hallmark of the Fibonacci heap is that it defers 'clean up' operations to be done at a point where they are more convenient, guaranteeing \(Θ(1)\) for several operations. Due to these deferred clean up steps, the worst case time complexity of the delete and extract minimum operations is \(O(n)\), however they turn out to be \(O(\log n)\) amortised.
---

The Fibonacci heap was designed in order to improve Dijkstra's shortest path algorithm from \\(O(m \log n)\\) to \\(O(m + n \log n\\) by optimising the operations used most by the algorithm.

Its name derives from the fact that the Fibonacci sequence is used in its complexity analysis.

*The animations in this article may not work in your browser, it has been tested in the latest Chrome and Firefox.*


## Time complexity

| Operation       | Description                                                             | Complexity         |
|-----------------|-------------------------------------------------------------------------|--------------------|
| Decrease key    | Decreases an existing key to some value                                 | \\(Θ(1)\\)\*       |
| Delete          | Deletes a node given a reference to **the node**                        | \\(O(\log n)\\)\*  |
| Extract minimum | Removes and returns the minimum value given a reference to **the node** | \\(O(\log n)\\)\*  |
| Find minimum    | Returns the minimum value                                               | \\(Θ(1)\\)         |
| Insert          | Inserts a new value                                                     | \\(Θ(1)\\)         |
| Union           | Combine the heap with another to form a valid Fibonacci heap             | \\(Θ(1)\\)         |

\* *Amortised*




## Structure

Like the binomial heap, a Fibonacci heap is a collection of heap-ordered trees. They do not need to be binomial trees however, this is where the relaxation of some of the binomial heap's properties comes in.



## Links

The pointers in the Fibonacci heap is very similar to how the binomial heap, only that each node in a Fibonacci heap contains a doubly linked list of all its children. This allows node removal and child list concatenation to both be performed in linear time.

{% include post-image.html class="center-aligned" alt="Links" src="/images/2014//links.svg" %}



## 'Marked' nodes

An important part of the Fibonacci Heap is how it 'marks' nodes in order to achieve its desired time bounds. The decrease key operation marks a node when it is cut from a tree, 

http://programmers.stackexchange.com/questions/187410/marked-nodes-in-fibonacci-heaps
http://stackoverflow.com/questions/12864914/what-is-the-purpose-behind-marking-some-of-the-nodes-in-fibonacci-heap



## Operations

### Decrease key

Decrease key sets a node's key to a certain value less than the original. The node is then 'cut' from the tree, joining the root list as its own tree.



The parent of the node is then cut if it is 'marked', this continues for each anscestor until a node that is not 'marked' is encountered which is then 'marked'.





### Delete

Delete is performed by calling decrease key to reducing the node to negative infinity which pulls the node to the top of the tree. Extract minimum is then called to remove the node from the heap.





### Extract minimum

Extract minimum is by far the most complex operation of a Fibonacci Heap as it's where the actions that were deferred by other operations are performed. It starts removing the minimum node from the root list and adding its children to the root list.



If the minimum was the only node in the root list, the new minimum node to the smallest node in the root list and the operation is completed. Otherwise, the 'consolidate' operation is called which merges all trees of the same degree together until there is no two trees with the same degree.



The minimum is set as the smallest node in the root list.





### Find minimum

The minimum node in the heap is always maintained in a dedicated pointer.



### Insert

Insert creates a new tree with degree one containing only the new node which is added to the heap. This is initialised with a child doubly linked list containing only itself. The total number of nodes in the tree \\(n\\) is incremented and the pointer to the minimum value \\(min\\) is if necessary.

The insert operation of a fibonacci heap does not attempt to union the trees, opting instead to defer until a later operation.



### Union

Union concatenates the root lists of two Fibonacci Heaps and sets the minimum node to which ever tree's minimum node is smaller.



## Code

<!--prettify lang=java-->
    ...



## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: /2014/01/binomial-heap.html


Priority queue implementation, like binary heap
Original motivation: improve Dijkstra's shortest path algorithm from O(E log V) to O(E + V log V)
Similar to binomial heaps, but less rigid structure.
Name comes from the fibonacci sequence being used in the time complexity analysis

If neither decrease-key nor delete is ever invoked on a fibonacci heap, each tree in the heap is like a binomial tree

Note to expect reader to know about binomial heaps?





http://www.cs.princeton.edu/~wayne/teaching/fibonacci-heap.pdf
http://en.wikipedia.org/wiki/Fibonacci_heap
http://stackoverflow.com/questions/19508526/what-is-the-intuition-behind-the-fibonacci-heap-data-structure
