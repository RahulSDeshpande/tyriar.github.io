---
layout      : post
title       : Binary search
tags        : [Algorithm, Computer science, Java, Searching]
primarytag  : Algorithm
intro       : Binary search is a decrease and conquer search algorithm than can be used on a sorted array. It operates by determining whether the search value is less than or greater than the middle value and recursively calling itself on the lower or upper half of the list respectively until either the value is found or not found.
---

The binary search algorithm is very similar to the binary search tree's search operation though not identical. Binary search's average and worst case time complexity is \\(O(\log n)\\), while binary search tree does have an average case of \\(O(\log n)\\), it has a worst case of \\(O(n)\\). Namely when the tree's height equals the number of items in the tree (incredibly unlikely in any real scenario).

The real power in binary search shows itself when we use it to search a huge list of items, much like any logarithmic algorithm. Exponential functions work by looking at the whole input data when considering each item. Logarithms (inverse-exponential functions) work by repeatedly halving the input data. Consider a list that contains 1 million items, if this list happens to be sorted we can use binary search to search for an item in no more than **20 steps**.



<table>
<tbody>
<tr>
<th>Values compared</th>
<th>Possible candidates</th>
</tr>
<tr>
<td>0</td>
<td>1000000</td>
</tr>
<tr>
<td>1</td>
<td>500000</td>
</tr>
<tr>
<td>2</td>
<td>250000</td>
</tr>
<tr>
<td>3</td>
<td>125000</td>
</tr>
<tr>
<td>4</td>
<td>62500</td>
</tr>
<tr>
<td>5</td>
<td>31250</td>
</tr>
<tr>
<td>6</td>
<td>15625</td>
</tr>
<tr>
<td>7</td>
<td>7812</td>
</tr>
<tr>
<td>8</td>
<td>3906</td>
</tr>
<tr>
<td>9</td>
<td>1953</td>
</tr>
<tr>
<td>10</td>
<td>976</td>
</tr>
<tr>
<td>11</td>
<td>488</td>
</tr>
<tr>
<td>12</td>
<td>244</td>
</tr>
<tr>
<td>13</td>
<td>122</td>
</tr>
<tr>
<td>14</td>
<td>61</td>
</tr>
<tr>
<td>15</td>
<td>30</td>
</tr>
<tr>
<td>16</td>
<td>15</td>
</tr>
<tr>
<td>17</td>
<td>7</td>
</tr>
<tr>
<td>18</td>
<td>3</td>
</tr>
<tr>
<td>19</td>
<td>1</td>
</tr>
</tbody></table>

While maintaining a sorted list does take more effort, it may be worth it when we consider the incredible speed of the search. It all depends on what operation demands faster speed in your application.

Alternatively, we can get the same search speed with a smaller insert cost by using a balanced binary search tree, though there is quite a bit more to the implementation.



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
<td>\(O(\log n)\)</td>
<td>\(O(1)\)</td>
<td>\(O(\log n)\)</td>
<td>\(O(1)\) auxiliary</td>
</tr>
</tbody>
</table>



## Decrease and conquer

These types of algorithms have often been labelled as divide and conquer algorithms like [merge sort][1]. The name decrease and conquer has been proposed in order to differentiate any recursive algorithm from algorithms that halve a problem into two sub-problems which allowing for better parallelism.



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public class BinarySearch {
        public static boolean search(int[] sortedArray, int value) {
            return search(sortedArray, value, 0, sortedArray.length - 1);
        }

        private static boolean search(int[] sortedArray,
                                      int value,
                                      int min,
                                      int max) {
            if (max < min)
                return false;
            else {
                int mid = (min + max) / 2;

                if (sortedArray[mid] > value)
                    return search(sortedArray, value, min, mid-1);
                else if (sortedArray[mid] < value)
                    return search(sortedArray, value, mid+1, max);
                else
                    return true;
            }
        }
    }



[1]: {{site.baseurl}}/2012/11/algorithm-merge-sort.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/search/binary-search