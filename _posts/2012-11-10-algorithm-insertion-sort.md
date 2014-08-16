---
layout      : post
title       : Insertion sort
tags        : [Algorithm, Computer science, Java, Sorting]
isfeatured  : 1
preview     : /images/2012/11/10/simple-insertion-sort.svg
socialimage : /images/2012/11/10/preview.png
primarytag  : Sorting
intro       : Insertion sort works by looking at each item in an array (starting with the second) and comparing it with the item before. If the item before is larger, they are swapped. This continues until the item is smaller at which point we do the same for the next item.
---

{% include post-image.html class="right-col" alt="Insertion sort example" src="/images/2012/11/10/insertion-sort.svg" %}

As you probably guessed, insertion sort isn't one of the fastest sorts, running in \\(O(n^2)\\) worst case time. It does have a few benefits however:

- It is faster than most \\(O(n \log n)\\) sorting algorithms for small lists.
- It is very memory efficient requiring only \\(O(1)\\) auxiliary space for the single item that is being moved.
- It is a stable sort; equal elements appear in the same order in the sorted list.
- It is an adaptive sort; it's fast when sorting mostly sorted lists or when adding items to an already sorted list.
- It is *really* easy to implement.

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
<td>\(O(n)\)</td>
<td>\(O(n^2)\)</td>
<td>\(O(1)\) auxiliary</td>
</tr>
</tbody>
</table>



## When it's fast

{% include post-image.html class="right-col" alt="Sorting 2,3,4,5,1 example" src="/images/2012/11/10/simple-insertion-sort.svg" %}

As mentioned above it can be fast under certain circumstances. Consider the array `[2,3,4,5,1]`, when using an algorithm like [merge sort][Merge sort] we would still need to split all the items and them merge them back up. With insertion sort we just need to verify that `[2,3,4,5]` are in the correct 'sorted so far' order, then we shift all of them up one index for `1`.

Being an adaptive sort also makes it an online algorithm, which means we can start sorting before we get all the items and then merge the lists once the partial sorting has completed.

<div class="clear"><!----></div>



## Code

{% include on-github.html java="https://github.com/Tyriar/growing-with-the-web/tree/master/com/growingwiththeweb/algorithms/sorting" javascript="https://github.com/Tyriar/js-sorting/blob/master/src/insertion-sort.js" %}

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



[Heapsort]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
[Insertion sort]: {{site.baseurl}}/2012/11/algorithm-insertion-sort.html
[Merge sort]: {{site.baseurl}}/2012/11/algorithm-merge-sort.html
[Quicksort]: {{site.baseurl}}/2012/12/algorithm-quicksort.html
