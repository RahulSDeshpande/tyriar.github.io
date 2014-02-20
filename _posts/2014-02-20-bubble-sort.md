---
layout      : post
title       : Bubble sort
tags        : [Algorithm, Computer science, Java, Sorting]
preview     : /images/2014/02/20/bubble-sort.svg
socialimage : /images/2014/02/20/bubble-sort.png
primarytag  : Sorting
intro       : While studying efficient sorting algorithms is beneficial, studying slow ones, at least initially is as well since it teaches us why they're bad. Bubble sort is one of those bad sorting algorithms. I recall as a young programmer, around 11 years old before I had any formal training, bubble sort is how I intuitively sorted a list.
---

{% include post-image.html class="right-col" alt="Bubble sort example" src="/images/2014/02/20/bubble-sort.svg" %}

Bubble sort is an \\(O(n^2)\\) sorting algorithm that gets its name because it "bubbles up" elements to their correct positions. This is done by iterating through the list multiple times, swapping elements with their neighbours if they are not in the correct order.

Elements are only ever swapped with their neighbours and it is done in somewhat of an unorganised manner, this can lead to an obscene amount of swaps. This is why it's so difficult to recommend bubble sort for anything, it even performs badly against other \\(O(n^2)\\) algorithms. Algorithms like [insertion sort][1] and [selection sort][2] in contrast perform considerably better in practise.

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

{% include post-image.html class="right-col" alt="Sorting 3,1,2,5,4 example" src="/images/2014/02/20/simple-bubble-sort.svg" %}

Bubble sort is fast when the list is either sorted or almost sorted, only requiring swapping adjacent elements, meaning only one or two iterations are needed respectively. This is providing the implementation is using an "optimised" version of the algorithm that tracks whether no swaps take place in an iteration and exits early (like `sortWhile` below).

Bubble sort also has no problem sorting large elements that are near the front of the list (known as *rabbits*), small elements near the end of the list (known as *turtles*) will considerably slow down the algorithm though. This is because elements are only moved closer to the start of the list once per iteration at most, elements can move closer to the end many times.

To better understand this point consider the list `[5, 2, 3, 4, 1]` where only the elements 1 and 5 are displaced. The 5 will be moved to the end of the list in the first iteration of bubble sort whereas the 1 will take all 4 (\\(n-1\\)) iterations to reach the start.

<div class="clear"><!----></div>



## Code

[View on GitHub][3]

### `for` loop version

This is the most common implementation of bubble sort.

<!--prettify lang=java-->
    public static void sortFor(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = 1; j < array.length - i; j++) {
                if (array[j - 1] > array[j]) {
                    swap(array, j, j - 1);
                }
            }
        }
    }

<!--prettify lang=java-->
    private static void swap(int[] array, int a, int b) {
        int temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }

### `while` loop version

This is an optimised version of bubble sort using a `while` loop that will exit early when it can and doesn't attempt to sort elements after the element that was swapped last in the previous iteration.

<!--prettify lang=java-->
    public static void sortWhile(int[] array) {
        int unsortedBelow = array.length;
        do {
            int lastSwap = 0;
            for (int i = 1; i < unsortedBelow; i++) {
                if (array[i - 1] > array[i]) {
                    swap(array, i, i - 1);
                    lastSwap = i;
                }
            }
            unsortedBelow = lastSwap;
        } while (unsortedBelow != 0);
    }



[1]: {{ site.baseurl }}/2012/11/algorithm-insertion-sort.html
[2]: {{ site.baseurl }}/2013/12/selection-sort.html
[3]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/sorting/bubble-sort
