---
layout      : post
title       : Reverse a linked list
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
preview     : /images/2014/03/06/singly-linked-list.svg
socialimage : /images/2014/03/06/singly-linked-list.png
intro       : This article looks at the interview question - <em>Reverse a linked list</em>.
---

Whenever an interviewer asks this question, or any question on linked lists, there is something you should ask before doing anything;

> Is it a singly linked list of a doubly linked list?

Most often than not it will likely be singly linked list since they generally lead to the more compelling problems, but you need to ask or you could solve the wrong problem. This article will present solutions for both data structures.



## Singly linked list

### Analysis

Let's start off by defining the data structure:

<!--prettify lang=java-->
    public class LinkedList {
        public int data;
        public LinkedList next;
    }

Linked list questions always seem simple, but when you get into dealing with the pointers it's easy to get lost. I recommend drawing a picture of the pointers, that way if you do get confused you can always refer to it.

{% include post-image.html class="center-aligned" alt="Singly linked list being reversed" src="/images/2014/03/06/singly-linked-list.svg" %}

The most important thing in this problem is to make sure the head and tail pointers are handled. Notice in the image how the old head's next point will be `null` whereas the new head is no longer `null`. The main section of the function will involve flipping the pointer between elements the other way.

Just remember if you ever get lost, go back to the picture.

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

### Analysis

Again, let's define the data structure:

<!--prettify lang=java-->
    public class LinkedList {
        public int data;
        public LinkedList next;
        public LinkedList prev;
    }

Now draw the picture:

{% include post-image.html class="center-aligned" alt="Doubly linked list being reversed" src="/images/2014/03/06/doubly-linked-list.svg" %}

It becomes clear from the picture that the list can be reversed by simply swapping each node's next and prev pointers. The only part that could be tricky with this question is ensuring that the new head pointer is valid and doesn't introduce a cycle.

### Pseudocode

<pre>function reverseDoubly (head)
  if head is null
    return null

  loop {
    swap head.next and head.prev values
    if head.prev is null
      return head
    head &larr; head.prev
  }</pre>

### Code

[View on GitHub][1]

<!--prettify lang=java-->
    public static LinkedList reverseDoubly(LinkedList head) {
        while (head != null) {
            LinkedList temp = head.next;
            head.next = head.prev;
            head.prev = temp;
            if (temp == null)
                break;
            head = temp;
        }
        return head;
    }



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/reverse-a-linked-list