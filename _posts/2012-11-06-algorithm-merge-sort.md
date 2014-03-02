---
layout      : post
title       : Merge sort
tags        : [Algorithm, Computer science, Concurrency, Java, Sorting]
isfeatured  : 1
preview     : /images/2012/11/06/merge-sort.svg
socialimage : /images/2012/11/06/preview.png
primarytag  : Sorting
intro       : Merge sort is a sorting algorithm that runs in \(O(n \log n)\) time. It is a divide and conquer algorithm, so it can get the most out of today's multi-cored systems. It works by continually splitting up the array until each item stands on its own. The items are then merged back with the items that they were split with in the correct order.
---

{% include post-image.html class="right-col" alt="Merge sort example" src="/images/2012/11/06/merge-sort.svg" %}

Merge sort is also a stable sort, this means that if there are elements considered equal, they will be in the same order in the final list. This is illustrated in the below image, teal and blue (9) are in the same order in both the source and sorted lists.

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
<td>\(O(n \log n)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(n \log n)\)</td>
<td>\(O(n)\) auxiliary</td>
</tr>
</tbody>
</table>



## Parallelism

Due to it being a divide and conquer algorithm the work can be easily split up and worked on using different threads, a very useful trait for high performance systems with large amounts of data.

Here is an example of how you could run merge sort using two threads to potentially halve the runtime of the middle section.

{% include post-image.html class="center-aligned" alt="Parallel merge sort" src="/images/2012/11/06/parallel.svg" %}



## Code

[View on GitHub][1]

### Top-down

The top-down variant is considered the 'normal' merge sorting algorithm.

<!--prettify lang=java-->
    public static int[] mergeSort(int[] array) {
        if (array.length <= 1)
            return array;

        int middle = array.length / 2;
        int[] left = new int[middle];
        int[] right = new int[array.length - middle];

        for (int i = 0; i < left.length; i++) {
            left[i] = array[i];
        }
        for (int i = 0; i < right.length; i++) {
            right[i] = array[i + left.length];
        }

        left = mergeSort(left);
        right = mergeSort(right);

        return merge(left, right);
    }

    public static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int leftIndex = 0;
        int rightIndex = 0;
        int resultIndex = 0;
        while (leftIndex < left.length || rightIndex < right.length) {
            if (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] <= right[rightIndex]) {
                    result[resultIndex++] = left[leftIndex++];
                } else {
                    result[resultIndex++] = right[rightIndex++];
                }
            } else if (leftIndex < left.length) {
                result[resultIndex++] = left[leftIndex++];
            } else if (rightIndex < right.length) {
                result[resultIndex++] = right[rightIndex++];
            }
        }
        return result;
    }

### Bottom-up

Bottom up is a non-recursive variant of merge sort that splits the array into chunks of size one, uses an in-place merge to merge adjacent elements and then repeats with the chunks doubling in size.

<!--prettify lang=java-->
    public static void bottomUpMergeSort(int[] array) {
        int[] workArray = new int[array.length];
        int chunkSize = 1;
        while (chunkSize < array.length) {
            int i = 0;
            while (i < array.length - chunkSize) {
                bottomUpMerge(array, i, chunkSize, workArray);
                i += chunkSize * 2;
            }
            chunkSize *= 2;
        }
    }

    public static void bottomUpMerge(int[] array, int leftPosition, int chunkSize, int[] workArray) {
        int rightPosition = leftPosition + chunkSize;
        int endPosition = Math.min(leftPosition + chunkSize * 2 - 1, array.length - 1);
        int leftIndex = leftPosition;
        int rightIndex = rightPosition;

        for (int i = 0; i <= endPosition - leftPosition; i++) {
            if (leftIndex < rightPosition &&
                    (rightIndex > endPosition ||
                    array[leftIndex] <= array[rightIndex])) {
                workArray[i] = array[leftIndex++];
            } else {
                workArray[i] = array[rightIndex++];
            }
        }

        for (int i = leftPosition; i <= endPosition; i++) {
            array[i] = workArray[i - leftPosition];
        }
    }

This algorithm could be improved by alternating `array` and `workArray` whenever `chunkSize` is incremented. I didn't want to do this in the above code as I wanted to focus more on the implementation of the algorithm, not so much optimisation.

### Natural merge sort

Natural merge sort is another variant of merge sort, this one attempts to minimise the sorting of data that is in the correct order by recognising 'chunks' that are already sorted. I've implemented it below using `Queue`s.

<!--prettify lang=java-->
    public static <T extends Comparable<T>> Queue<T> naturalMergeSort(Queue<T> input) {
        int arrayIndex = 0;
        Queue<T> output = new LinkedList<T>();
        Queue<T> tempArray1 = new LinkedList<T>();
        Queue<T> tempArray2 = new LinkedList<T>();
        while (arrayIndex < input.size()) {
            while (input.size() > 0) {
                while (input.size() > 0) {
                    naturalMerge(input, output, tempArray1);
                    naturalMerge(input, output, tempArray2);
                }
                while (tempArray1.size() > 0 || tempArray2.size() > 0) {
                    naturalMerge(tempArray1, tempArray2, output);
                    naturalMerge(tempArray1, tempArray2, input);
                }
            }
        }
        return output;
    }

    public static <T extends Comparable<T>> void naturalMerge(Queue<T> left, Queue<T> right, Queue<T> output) {
        T prevLeft = null;
        T prevRight = null;
        while ((left.size() > 0 && (prevLeft == null || prevLeft.compareTo(left.peek()) <= 0)) ||
               (right.size() > 0 && (prevRight == null || prevRight.compareTo(right.peek()) <= 0))) {

            if (right.size() == 0 || (left.size() > 0 && left.peek().compareTo(right.peek()) <= 0)) {
                prevLeft = left.poll();
                output.add(prevLeft);
            } else {
                prevRight = right.poll();
                output.add(prevRight);
            }
        }
    }



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/sorting/merge-sort

[Heapsort]: {{site.baseurl}}/2012/11/algorithm-heapsort.html
[Insertion sort]: {{site.baseurl}}/2012/11/algorithm-insertion-sort.html
[Mergesort]: {{site.baseurl}}/2012/11/algorithm-merge-sort.html
[Quicksort]: {{site.baseurl}}/2012/12/algorithm-quicksort.html
