---
layout      : post
title       : Find the median of two sorted arrays
tags        : [Algorithm, Computer science, Interview questions, Java, Math]
primarytag  : Interview questions
intro       : This article looks at the interview question - <em>Given two sorted arrays both containing \\(n\\) elements, find the median of their union in \\(O(\log n)\\) time
---

We could just merge the lists and do a regular [binary search][1], but tha will take at least \\(O(n)\\) time so we need to be more clever. We need to simulate binary search across two lists, since they're sorted this is possible.


[1, 2, 3, 4, 5]

[3, 4, 5, 6, 7]

The lists are guarenteed to be even, so the median will be either the same number from both the lists or the mid-point of two numbers from both lists.




// Start binary searching both lists, compare the numbers against each other and continue binary searching until either; the numbers are equal in which case it is the median, or the equality changes in which case the median is the average of the previous two numbers.



<!--prettify lang=java-->
    public static int findMedian(int[] list1, int[] list2) {
        if (list1.length != list2.length) {
            throw new IllegalArgumentException("list1 and list2 need to be the same size");
        }
        int size = list1.length;
        int move = size / 2
        int position1 = move;
        int position2 = size - move; // so we're searching the same length

        if (list1[position1] == list2[position2])
            return list1[position1];

        boolean isSignGreater = list1[position1] > list2[position2];
        int last1;
        int last2;

        while (isSignGreater == list1[position1] > list2[position2]) {
            last1 = list1[position1];
            last2 = list2[position2];
            if (isSignGreater) {
                move = position1 / 2;
                position1 -= move;
                position2 += move;
            } else {
                move = (position2) / 2;
                position1 += move;
                position2 -= move;
            }
        }

        if (list1[position1] == list2[position2])
            return list1[position1];
        return ((float)last1 / last2) * 2;
    }








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





[1]: http://www.growingwiththeweb.com/2012/11/algorithm-binary-search.html
