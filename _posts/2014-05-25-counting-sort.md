---
layout      : post
title       : Counting sort
tags        : [Algorithm, Computer science, Java, Sorting]
isfeatured  : 1
preview     : /images/2014/05/25/counting-sort.svg
socialimage : /images/2014/05/25/counting-sort.png
primarytag  : Sorting
intro       : Counting sort is a non-comparison integer sort that achieves linear time complexity given some trade-offs and provided some requirements are met.
draft : 1
---

{% include post-image.html class="right-col" alt="Counting sort example" src="/images/2014/05/25/counting-sort.svg" %}

Counting sort works by creating an auxiliary array the size of the range of values, the unsorted values are then placed into the new array using the *value* as the *index*. The auxiliary array is now in sorted order and can be iterated over to construct the sorted array.

Counting sort can be exceptionally fast because of the way that elements are sorted using their values as array keys. This means that more memory is required for the extra array at the cost of running time. It runs in \\(O(n + k)\\) time where \\(n\\) is the number of elements to be sorted and \\(k\\) is the number of possible values in the range.

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
<td>\(O(n + k)\)</td>
<td>\(O(n + k)\)</td>
<td>\(O(n + k)\)</td>
<td>\(O(n + k)\) auxiliary</td>
</tr>
</tbody>
</table>



## Primitives, objects and duplicates

The basic algorithm can be augmented depending on the situation. For example when sorting primitives, you likely don't care about retaining the original reference or stability of duplicates so the auxiliary array can be used to *count* instances of the value which can be reconstructed after.

Sorting objects where there can be duplicates however you will need a more sophisticated method of storing values in the auxiliary array such as a linked list or dynamic array.



## Non-zero minimum

Most versions of counting sort use a minimum value of either 0 or 1, this can be easily adjusted to suit any minimum value though by shifting the indexes back and forward certain amounts. Say the list is known to have a minimum possible value of 200, the algorithm can be easily modified so that values are added onto auxiliary array at index \\(i - 200\\) and added back on to the sorted array with the value \\(i + 200\\), improving both memory usage and performance.



## Ideal usage scenario

Counting sort is an ideal algorithm choice when:

- Integer values are being sorted
- The range of elements is known
- Most of the elements in the range are present
- The additional memory usage is not an issue

If the list is known to be partially sorted then another option such as [insertion sort][1] may end up being better, since counting sort does not take advantage of that.



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public static void sort(int[] array, int maxValue) {
        int[] buckets = new int[maxValue + 1];

        for (int i = 0; i < array.length; i++) {
            buckets[array[i]]++;
        }

        int sortedIndex = 0;
        for (int i = 0; i < buckets.length; i++) {
            while (buckets[i] > 0) {
                array[sortedIndex++] = i;
                buckets[i]--;
            }
        }
    }



## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: http://www.growingwiththeweb.com/2012/11/algorithm-insertion-sort.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/sorting/counting-sort
