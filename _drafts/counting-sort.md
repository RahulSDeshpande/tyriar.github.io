---
layout      : post
title       : Counting sort
tags        : [Algorithm, Computer science, Java, Sorting]
isfeatured  : 1
preview     : /images/2014/05/25/counting-sort.svg
socialimage : /images/2014/05/25/counting-sort.png
primarytag  : Sorting
intro       : Counting sort is a non-comparison integer sort that achieves linear time complexity (\(O(n)\)) given some trade-offs and requirements.
draft : 1
---

Counting sort works by creating a an auxiliary array the size of the range of values, the unsorted values are then placed into the new array using the *value* as the *index*. The auxiliary array is now in sorted order and iterated through to place the values back into the original array.

Counting sort can be exceptionally fast because of the way that elements are sorted using their values as array keys. This means that more memory is required for the extra array at the cost of running time. It runs in \\(O(n + k)\\) time where \\(n\\) is the number of elements to be sorted and \\(k\\) is the number of possible values in the range.



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




## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: http://www.growingwiththeweb.com/2012/11/algorithm-insertion-sort.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/sorting/counting-sort
