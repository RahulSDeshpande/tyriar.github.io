---
layout      : post
title       : Quicksort
tags        : [Algorithm, Computer science, Java, Sorting]
socialimage : /images/2012/12/05/preview.png
primarytag  : Sorting
intro       : Quicksort is an \(O(n^2)\) sorting algorithm that runs in \(O(n \log n)\) time on average. It has a number of favourable qualities; it's an in-place sort, requiring \(O(\log n)\) auxiliary space in the worst case; and is also a divide and conquer algorithm making it easy to parallelise. Unfortunately however it's not a stable sort.
---

{% include post-image.html class="right-col" alt="Quicksort example" src="/images/2012/12/05/quicksort.svg" %}

It works by first selecting a 'pivot' element, then re-ordering either side of the list so that everything before the pivot is less than the pivot and everything after is greater. Quicksort is then called recursively on either side of the pivot.

Despite quicksort having a worst-case performance of \\(O(n^2)\\), it is sometimes regarded at the same level performance-wise as \\(O(n \log n)\\) sorts like [merge sort][Merge sort] or [heapsort][Heapsort]. This is due to its average case being \\(O(n \log n)\\), it will often perform even better in practice than the \\(O(n \log n)\\) sorts.

<div class="clear"><!----></div>



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
<td>\(O(n^2)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(\log n)\) auxiliary</td>
</tr>
</tbody>
</table>



## Partition

{% include post-image.html class="right-col" alt="The partition operation" src="/images/2012/12/05/partition.svg" %}

The partition function is where the actual sorting happens. The image illustrates the function in action, using the right-most value as the pivot (`5`).

The function tracks three variables; `i`, `m` and `p`. Here is what each variable does:

- `i` - controlled by the `for` loop, it indicates the current index being considered.
- `m` - short for middle, represents the index in which all values to the left of it are *less than* the pivot.
- `p` - short for pivot, this is swapped at the end of the procedure with the item in the index `m+1`. This ensures that all values to the left of the pivot are less than the pivot and all to the right are greater

### The pivot

The choice of the pivot can have a great impact on the worst-case running time, particularly when using very unimaginative pivots like the left-most and right-most items in the list. If the pivot chosen ends up being either the highest or lowest value in the list, this will lead to worst case behaviour. More specifically, worst-case behaviour occurs when each partition returns two sub-lists, containing `n-1` and `0` items. To achieve best case the pivot needs to lie in the middle of the list, so the median value would be the best choice.

A simple method to have a much better shot at the average case of \\(O(n \log n)\\), is to randomise the pivot value. The randomised pivot function typically swaps a random element with the last element and then proceeds to run the regular partition procedure. This is demonstrated in the code section below in the `randomSort` function.



## Parallelisation

The chosen pivot has a great impact of how well quicksort can be parallelised. Consider the list `[1,2,3,4,5]`, if the right-most value is chosen as the pivot every time, then the sub-list to the right of the pivot will *always* be the empty set. This is where a random pivots help, or using some other method of choosing a value close to the median as the pivot.



## Code

[View on GitHub][1]

<!--prettify lang=java-->
    public class Quicksort {
        public static <T extends Comparable<T>> void sort(T[] array) {
            sort(array, 0, array.length - 1);
        }

        private static <T extends Comparable<T>> void sort(T[] array,
                                                           int left,
                                                           int right) {
            if (left < right) {
                int pivot = partition(array, left, right);
                sort(array, left, pivot - 1);
                sort(array, pivot + 1, right);
            }
        }

        private static <T extends Comparable<T>> int partition(T[] array,
                                                               int left,
                                                               int right) {
            T pivot = array[right];
            int mid = left;
            for (int i = mid; i < right; i++) {
                if (array[i].compareTo(pivot) <= 0) {
                    swap(array, i, mid++);
                }
            }
            swap(array, right, mid);
            return mid;
        }

        private static <T extends Comparable<T>> void swap(T[] array,
                                                           int i1,
                                                           int i2) {
            if (i1 != i2) {
                T temp = array[i1];
                array[i1] = array[i2];
                array[i2] = temp;
            }
        }
    }

### Randomised pivot

The following when added to the above class implements a randomised pivot.

<!--prettify lang=java-->
    private static Random random = new Random();

    public static <T extends Comparable<T>> void randomSort(T[] array) {
        randomSort(array, 0, array.length - 1);
    }

    private static <T extends Comparable<T>> void randomSort(T[] array,
                                                            int left,
                                                            int right) {
        if (left < right) {
            int pivot = randomPartition(array, left, right);
            randomSort(array, left, pivot - 1);
            randomSort(array, pivot + 1, right);
        }
    }

    private static <T extends Comparable<T>> int randomPartition(T[] array,
                                                                 int left,
                                                                 int right) {
        int pivot = left + random.nextInt(right - left);
        swap(array, right, pivot);
        return partition(array, left, right);
    }


[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/quicksort

[Heapsort]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
[Insertion sort]: {{site.baseurl}}/2012/11/algorithm-insertion-sort.html
[Merge sort]: {{site.baseurl}}/2012/11/algorithm-merge-sort.html
[Quicksort]: {{site.baseurl}}/2012/12/algorithm-quicksort.html
