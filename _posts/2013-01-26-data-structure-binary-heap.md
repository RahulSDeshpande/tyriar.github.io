---
layout      : post
title       : Binary heap
tags        : [Computer science, Data structure, Generics, Heap, Java, Tree]
socialimage : /images/2013/01/26/preview.png
primarytag  : Data structure
intro       : A binary heap is binary tree structure that typically uses an array as its underlying data structure. Heaps are one of the fundamental data structures that all software developers should have in their toolkit due to the fast extraction of either a minimum or a maximum element.
---

{% include post-image.html class="right-col" alt="Binary heap example" src="/images/2013/01/26/minheap.svg" %}

Heaps come in two flavours, the min-heap which allows quick \\(O(\log n)\\) extraction of the minimum element, and the max-heap which allows the same for the maximum value. Before it is possible to extract values, the heap must first be constructed. This is done by going through the first half of the elements (in the array) starting from the middle and calling 'heapify' on each element, running in \\(O(n)\\) time.

It is typical to implement priority queues using heaps due to their \\(O(\log n)\\) extract min/max time.



## Complexity

| Operation       | Description                                                             | Complexity            |
|-----------------|-------------------------------------------------------------------------|-----------------------|
| Decrease key    | Decreases an existing key to some value                                 | \\(Θ(\log n)\\) |
| Delete          | Deletes a node given a reference to **the node**                        | \\(Θ(\log n)\\) |
| Extract minimum | Removes and returns the minimum value given a reference to **the node** | \\(Θ(\log n)\\) |
| Find minimum    | Returns the minimum value                                               | \\(Θ(1)\\)      |
| Insert          | Inserts a new value                                                     | \\(Θ(\log n)\\) |
| Union           | Combine the heap with another to form a valid binomial heap             | \\(Θ(n)\\)      |



## Operations

All operations will use min-heap as an example.

### Heapify(i)

<pre>
smallest &larr; smallest child of node
if smallest exists and is less than node
  swap node with smallest in the list
  minHeapify(node)
</pre>

### Build heap

<pre>
for i &larr; floor(list's size / 2) to 0
  heapify(i)
</pre>

### Insert(item)

<pre>
add item to end of list
while item's parent exists and item is less than parent
  swap(item, parent)
</pre>

### ExtractMin / ExtractMax

<pre>
if list's size is 0
  return null
if list's size is 1
  remove and return only element
min &larr; list[0]
list[0] &larr; last element of list
heapify(0)
return min
</pre>

### Heapsort

[Heapsort][1] operates by forming a heap, extracting the min/max item and repeating on the smaller array until everything is sorted. This can be done in-place by heapifying and then incrementing the start index of the array. Heapsort runs in \\(O(n \log n)\\) time. This algorithm is explained in depth in the [Heapsort][1] article.



## Code

Here is a full generic implementation of a min-heap. Note that the only changes needed to be made to turn this into a max-heap are symbol names and the `compareTo` comparisons.

[View on GitHub][2]

<!--prettify lang=java-->
    public class MinHeap<T extends Comparable<T>> {
        private ArrayList<T> list;

        public MinHeap() {
            this(0);
        }

        public MinHeap(int size) {
            list = new ArrayList<T>(size);
        }

        public MinHeap(ArrayList<T> items) {
            list = items;
            buildHeap();
        }

        public void insert(T item) {
            int i = list.size();
            list.add(item);
            int parent = parent(i);
            while (parent != i && list.get(i).compareTo(list.get(parent)) < 0) {
                swap(i, parent);
                i = parent;
                parent = parent(i);
            }
        }

        public T extractMin() {
            if (list.size() == 0)
                return null;
            if (list.size() == 1)
                return list.remove(0);
            T min = list.get(0);
            T last = list.remove(list.size() - 1);
            list.set(0, last);
            heapify(0);
            return min;
        }

        public T min() {
            return list.get(0);
        }

        public boolean isEmpty() {
            return list.size() == 0;
        }

        public int size() {
            return list.size();
        }

        public void print() {
            for (int i = 0; i < list.size(); i++)
                System.out.print(list.get(i) + ", ");
            System.out.println();
        }

        private void buildHeap() {
            for (int i = (int)(list.size() / 2); i >= 0; i--)
                heapify(i);
        }

        private void heapify(int i) {
            int l = left(i);
            int r = right(i);
            int smallest = i;
            if (l < list.size() && list.get(l).compareTo(list.get(i)) < 0)
                smallest = l;
            if (r < list.size() && list.get(r).compareTo(list.get(small)) < 0)
                smallest = r;
            if (smallest != i) {
                swap(i, smallest);
                heapify(smallest);
            }
        }

        private void swap(int i1, int i2) {
            T temp = list.get(i1);
            list.set(i1, list.get(i2));
            list.set(i2, temp);
        }

        private int parent(int i) {
            return i / 2;
        }

        private int left(int i) {
            return 2 * i;
        }

        private int right(int i) {
            return 2 * i + 1;
        }
    }



[1]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/data-structures/binary-heap

[Binary heap]: {{site.baseurl}}/2013/01/data-structure-binary-heap.html
[Binary search tree]: {{site.baseurl}}/2012/10/data-structures-binary-search-tree.html
[Splay tree]: {{site.baseurl}}/2013/06/data-structure-splay-tree.html
[Red-black tree]: {{site.baseurl}}/2012/12/data-structure-red-black-tree.html
