---
layout      : post
title       : Reverse a linked list
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
intro       : This article looks at the interview question - <em>Reverse a linked list</em>.
---

Whenever somebody asks this question, or any question on linked lists there is a question you should ask before doing anything; *Is it a singly linked list of a doubly linked list?* It's usually a singly linked list for most computer science interview questions since they generally lead to the more compelling problems. This article will look at both solutions for completeness.



## Singly linked list

### Analysis

Let's start off by defining the data structure:

<!--prettify lang=java-->
    public class LinkedList {
        public int data;
        public LinkedList next;
    }

Linked list questions always seem easy but when you get into dealing with the pointers it's easy to get lost. I recommend drawing a picture of the pointers, that way if you do get confused you can always refer to it.

{% include post-image.html class="center-aligned" alt="Singly linked list being reversed" src="/images/2014/03/01/singly-linked-list.png" %}

The most important things in this problem is to keep track of the head and tail points. Notice in the image how the old head's next point will be `null` whereas the new head is no longer `null`.

The main section of the loop will involve swapping the pointer around the other way

Just remember if you ever get lost, go back to your picture.

### Pseudocode

<pre>function reverseSingly (head)
  if head is null
    return null
  prev &larr; null
  while head.next is not null
    head.next &larr; prev
    prev &larr; head
    head &larr; old value of head.next
  head.next &larr; prev
  return head</pre>

### Code

[View on GitHub][1]

<!--prettify lang=java-->
    public static LinkedList reverseSingly(LinkedList head) {
        if (head != null) {
            LinkedList prev = null;
            while (head.next != null) {
                LinkedList next = head.next;
                head.next = prev;
                prev = head;
                head = next;
            }
            head.next = prev;
        }
        return head;
    }



## Doubly linked list

{% include post-image.html class="center-aligned" alt="Doubly linked list being reversed" src="/images/2014/03/01/doubly-linked-list.png" %}

### Analysis

Again, let's define the data structure:

<!--prettify lang=java-->
    public class LinkedList {
        public int data;
        public LinkedList next;
        public LinkedList prev;
    }

### Complexity

### Code

[View on GitHub][1]

<!--prettify lang=java-->
    public static LinkedList reverseDoubly(LinkedList head) {
        while (head != null) {
            LinkedList temp = head.next;
            head.next = head.prev;
            head.prev = temp;
            if (temp == null)
                return head;
            head = temp;
        }
        return head;
    }



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/reverse-a-linked-list