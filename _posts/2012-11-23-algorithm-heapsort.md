---
layout      : post
title       : Heapsort
tags        : [Algorithm, Computer science, Java, Sorting]
socialimage : /images/2012/11/23/preview.png
primarytag  : Sorting
intro       : Heapsort is an \(O(n \log n)\) sorting algorithm that works by first constructing a heap out of the list and repeatedly pulling the root off the top of the heap and reconstructs it until there are no items left in the heap. The values that are pulled off of the top of the heap come out in sorted order. If the heap used was a min-heap, the resulting list will be in ascending order, and a max-heap will give them in descending order.
---

Unfortunately heapsort is not stable so sorting a list that is already sorted could quite possibly end up in a different order.

{% include post-image.html class="center-aligned" alt="Heapsort example" src="/images/2012/11/23/heapsort.svg" %}



## Complexity

<table>
<tbody>
<tr>
<th colspan="3">Time</th>
<th>Space</th>
</tr>
<tr>
<th>Worst case</th>
<th>Best case</th>
<th>Average case</th>
<th>Worst case</th>
</tr>
<tr>
<td>\(O(n \log n)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(1)\) auxiliary</td>
</tr>
</tbody>
</table>



## In-place

Construction of the heap can be done in place on an array by using the same array representation as a [binary search tree][1].

{% include post-image.html class="full-width" alt="ary tree array representation" src="/images/2012/11/23/array-representation.svg" %}

I mentioned earlier that when we use a min-heap they come out in ascending order, and a max-heap for descending. When performing an in-place sort we want to reverse this as we will be constructing the sorted list backwards. First, the heap is constructed in place, then we swap the root of the heap (index = 0) with the last element of the heap (index = max), the heap's size is reduced by one and it repeats until there is only 1 element left in the heap which will be in the correct position.



## Code

Here is a heapsort implementation done in Java using a max-heap.

{% include on-github.html java="https://github.com/Tyriar/growing-with-the-web/tree/master/com/growingwiththeweb/algorithms/sorting" javascript="https://github.com/Tyriar/js-sorting/blob/master/src/heapsort.js" %}

<!--prettify lang=java-->
    public class Heapsort {
        public static <T extends Comparable<T>> void sort(T[] array) {
            int heapSize = array.length;
            buildHeap(array, heapSize);
            while (heapSize > 1) {
                swap(array, 0, heapSize - 1);
                heapSize--;
                heapify(array, heapSize, 0);
            }
        }

        private static <T extends Comparable<T>> void buildHeap(T[] array,
                                                                int heapSize) {
            for (int i = (int)(array.length / 2); i >= 0; i--)
                heapify(array, heapSize, i);
        }

        private static <T extends Comparable<T>> void heapify(T[] array,
                                                              int heapSize,
                                                              int i) {
            int left = i * 2 + 1;
            int right = i * 2 + 2;
            int largest;
            if (left < heapSize && array[left].compareTo(array[i]) > 0)
                largest = left;
            else
                largest = i;
            if (right < heapSize && array[right].compareTo(array[largest]) > 0)
                largest = right;
            if (largest != i) {
                swap(array, i, largest);
                heapify(array, heapSize, largest);
            }
        }

        private static <T extends Comparable<T>> void swap(T[] array,
                                                           int i1,
                                                           int i2) {
            T temp = array[i1];
            array[i1] = array[i2];
            array[i2] = temp;
        }
    }



[1]: /2012/10/data-structures-binary-search-tree.html

[Heapsort]: /2012/11/algorithm-heapsort.html
[Insertion sort]: /2012/11/algorithm-insertion-sort.html
[Merge sort]: /2012/11/algorithm-merge-sort.html
[Quicksort]: /2012/12/algorithm-quicksort.html
