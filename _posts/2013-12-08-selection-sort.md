---
layout      : post
title       : Selection sort
tags        : [Algorithm, Computer science, Java, Sorting]
primarytag  : Sorting
socialimage : /images/2013/12/08/preview.png
intro       : Selection sort is an \(O(n^2)\) sorting algorithm that works by searching through a list to find the minimum element and swapping it for the first in the list. After every swap, selection sort is performed on the list with the head removed (ie. the minimum element). Due to the way that elements are swapped anywhere in the list, this is not a stable sort.
---

{% include post-image.html class="right-col" alt="Selection sort example" src="/images/2013/12/08/selection-sort.svg" %}

Selection sort is similar in complexity to [insertion sort][1] but almost always performs worse. This is due to the fact that selection sort has an exact number of comparisons based on \\(n\\), which can be defined using the arithmetic progression:

$$(n - 1) + (n - 2) + ... + 2 + 1 = n(n - 1) / 2$$

This makes its best case always contain the same amount of comparisons as its worst.

While selection sort is faster than most \\(O(\log n)\\) sorts for small lists, insertion sort is normally the preferable choice. It's main favourable property is that it will perform *at most* \\(n - 1\\) element swaps, so it may be useful if swapping is expensive.



## Comparing to heapsort

[Heapsort][3] uses the exact same technique that selection sort does in finding the minimum element and then 'detaching' the first element from the list and sorting the remainder. The only difference between them is that instead of searching for the minimum element every iteration, heapsort utilises the heap data structure to organise the sub-list and guarentee \\(O(n \log n)\\) run time.



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
<td>\(O(n^2)\)</td>
<td>\(O(n^2)\)</td>
<td>\(O(1)\) auxiliary</td>
</tr>
</tbody>
</table>



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public static void sort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex != i) {
                int temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
            }
        }
    }



[1]: {{site.baseurl}}/2012/11/algorithm-insertion-sort.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/selection-sort
[3]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
