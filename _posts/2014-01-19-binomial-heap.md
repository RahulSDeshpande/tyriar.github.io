---
layout      : post
title       : Binomial heap
tags        : [Computer science, Data structure, Generics, Java, Tree]
primarytag  : Data structure
isfeatured  : 1
preview     : /images/2014/01/19/binomial-heap.svg
socialimage : /images/2014/01/19/preview.png
intro       : A binomial heap is a priority queue data structure similar to the binary heap only with a more strict structure, it supports quicker merging of two heaps in \(Θ(\log n)\) at the cost of a slower find minimum operation. A binomial heap is made up of a series of unique 'binomial trees' which are constructed from smaller binomial trees.
---

{% include post-image.html class="right-col" alt="Binomial heap" src="/images/2014/01/19/binomial-heap.svg" %}

Just like a regular [binary heap][1], the binomial heap can be either a min heap or a max heap. It also follows the properties of the heap data structure; all nodes must be smaller than their children for a min heap, or larger for a max heap.

*The animations in this article may not work in your browser, it has been tested in the latest Chrome and Firefox.*

<div class="clear"><!----></div>



## Complexity

| Operation       | Description                                                             | Complexity                |
|-----------------|-------------------------------------------------------------------------|---------------------------|
| Decrease key    | Decreases an existing key to some value                                 | \\(Θ(\log n)\\)     |
| Delete          | Deletes a node given a reference to **the node**                        | \\(Θ(\log n)\\)     |
| Extract minimum | Removes and returns the minimum value given a reference to **the node** | \\(Θ(\log n)\\)     |
| Find minimum    | Returns the minimum value                                               | \\(O(\log n)\\)\*         |
| Insert          | Inserts a new value                                                     | \\(O(\log n)\\)           |
| Union           | Combine the heap with another to form a valid binomial heap             | \\(Θ(\log n)\\)\*\* |

\* *This can be reduced to \\(Θ(1)\\) by maintaining a pointer to the minimum element*<br />
\*\* *Where \\(n\\) is the size of the larger heap*

## Structure

A binomial heap is made of a series of binomial trees each of which have a unique order. The order of a binomial tree defines how many elements it can contain, namely \\(2^{order}\\). Each tree of the order \\(x\\) is constructed by linking trees of the order \\(x - 1, x - 2, ... 1, 0\\) together.

An interesting property of the structure is that it resembles the binary number system. For example, a binomial heap with 30 elements will have binomial trees of the order 1, 2, 3 and 4, which are in the same positions as the number 30 in binary '11110'.

{% include post-image.html class="full-width stretch" alt="Structure" src="/images/2014/01/19/structure.svg" %}



## Links

The typical method of implementing the links between nodes is to have pointers to a parent, sibling and child. A tree does not have a direct link to all it's immediate children, instead it goes to its first child and then iterates through each sibling. Here is an illustration of the regular pointer structure for a binomial tree.

{% include post-image.html class="center-aligned" alt="Links" src="/images/2014/01/19/links.svg" %}



## Operations

### Decrease key

Decrease key reduces the specified node's key and then bubbles it up through its ancestors until the tree meets the conditions of a heap.

{% include svg-with-script.html class="center-aligned" alt="Decrease key" src="/images/2014/01/19/decrease-key.anim.svg" width="240px" %}


### Delete

Delete is performed by calling decrease key to reducing the node to negative infinity which pulls the node to the top of the tree.

{% include svg-with-script.html class="center-aligned" alt="Delete step 1" src="/images/2014/01/19/delete-step1.anim.svg" width="420px" %}

The tree is then detached from the rest of the heap and the node removed. The fragments of the old tree are reversed and linked together to form a new heap.

{% include svg-with-script.html class="center-aligned" alt="Delete step 2" src="/images/2014/01/19/delete-step2.anim.svg" width="420px" %}

The two heaps can then be combined using the union operation.


### Extract minimum

Extract minimum iterates through the roots of each binomial tree in the heap to find the smallest node which is removed. The tree fragments are then reversed to form another heap.

{% include svg-with-script.html class="center-aligned" alt="Extract minimum" src="/images/2014/01/19/extract-minimum.anim.svg" width="300px" %}

The two heaps can then be combined using the union operation.


### Find minimum

Find minimum iterates through the roots of each binomial tree in the heap.

{% include post-image.html class="center-aligned" alt="Find minimum" src="/images/2014/01/19/find-minimum.svg" %}


### Insert

Insert creates a new heap with the inserted element which are then combined using the union operation.

{% include post-image.html class="center-aligned" alt="Insert" src="/images/2014/01/19/insert.svg" %}


### Union

The union operation merges the two heaps together by continually linking trees of the same order until no two trees of the same order exist.

{% include svg-with-script.html class="center-aligned" alt="Union" src="/images/2014/01/19/union.anim.svg" width="240px" %}



## Code

The below is a generic implementation of a min binomial heap that uses the value stored as the key.

[View on GitHub][2]

<!--prettify lang=java-->
    public class BinomialHeap<T extends Comparable<T>> {
        private Node<T> head;

        public BinomialHeap() {
            head = null;
        }

        public BinomialHeap(Node<T> head) {
            this.head = head;
        }

        public boolean isEmpty() {
            return head == null;
        }

        public void clear() {
            head = null;
        }

        public void insert(T key) {
            Node<T> node = new Node<T>(key);
            BinomialHeap<T> tempHeap = new BinomialHeap<T>(node);
            head = union(tempHeap);
        }

        public T findMinimum() {
            if (head == null) {
                return null;
            } else {
                Node<T> min = head;
                Node<T> next = min.sibling;

                while (next != null) {
                    if (next.compareTo(min) < 0)
                        min = next;
                    next = next.sibling;
                }

                return min.key;
            }
        }

        // Implemented to test delete/decrease key, runs in O(n) time
        public Node<T> search(T key) {
            List<Node<T>> nodes = new ArrayList<Node<T>>();
            nodes.add(head);
            while (!nodes.isEmpty()) {
                Node<T> curr = nodes.get(0);
                nodes.remove(0);
                if (curr.key == key) {
                    return curr;
                }
                if (curr.sibling != null)
                    nodes.add(curr.sibling);
                if (curr.child != null)
                    nodes.add(curr.child);
            }
            return null;
        }

        public void decreaseKey(Node<T> node, T newKey) {
            node.key = newKey;
            bubbleUp(node, false);
        }

        public void delete(Node<T> node) {
            node = bubbleUp(node, true);
            if (head == node) {
                removeTreeRoot(node, null);
            } else {
                Node<T> prev = head;
                while (prev.sibling.compareTo(node) != 0)
                    prev = prev.sibling;
                removeTreeRoot(node, prev);
            }
        }

        private Node<T> bubbleUp(Node<T> node, boolean toRoot) {
            Node<T> parent = node.parent;
            while (parent != null && (toRoot || node.compareTo(parent) < 0)) {
                T temp = node.key;
                node.key = parent.key;
                parent.key = temp;
                node = parent;
                parent = parent.parent;
            }
            return node;
        }

        public T extractMin() {
            if (head == null)
                return null;

            Node<T> min = head;
            Node<T> minPrev = null;
            Node<T> next = min.sibling;
            Node<T> nextPrev = min;

            while (next != null) {
                if (next.compareTo(min) < 0) {
                    min = next;
                    minPrev = nextPrev;
                }
                nextPrev = next;
                next = next.sibling;
            }

            removeTreeRoot(min, minPrev);
            return min.key;
        }

        private void removeTreeRoot(Node<T> root, Node<T> prev) {
            // Remove root from the heap
            if (root == head)
                head = root.sibling;
            else
                prev.sibling = root.sibling;

            // Reverse the order of root's children and make a new heap
            Node<T> newHead = null;
            Node<T> child = root.child;
            while (child != null) {
                Node<T> next = child.sibling;
                child.sibling = newHead;
                child.parent = null;
                newHead = child;
                child = next;
            }
            BinomialHeap<T> newHeap = new BinomialHeap<T>(newHead);

            // Union the heaps and set its head as this.head
            head = union(newHeap);
        }

        // Merge two binomial trees of the same order
        private void linkTree(Node<T> minNodeTree, Node<T> other) {
            other.parent = minNodeTree;
            other.sibling = minNodeTree.child;
            minNodeTree.child = other;
            minNodeTree.degree++;
        }

        // Union two binomial heaps into one and return the head
        public Node<T> union(BinomialHeap<T> heap) {
            Node<T> newHead = merge(this, heap);

            head = null;
            heap.head = null;

            if (newHead == null)
                return null;

            Node<T> prev = null;
            Node<T> curr = newHead;
            Node<T> next = newHead.sibling;

            while (next != null) {
                if (curr.degree != next.degree || (next.sibling != null && 
                        next.sibling.degree == curr.degree)) {
                    prev = curr;
                    curr = next;
                } else {
                    if (curr.compareTo(next) < 0) {
                        curr.sibling = next.sibling;
                        linkTree(curr, next);
                    } else {
                        if (prev == null)
                            newHead = next;
                        else
                            prev.sibling = next;

                        linkTree(next, curr);
                        curr = next;
                    }
                }

                next = curr.sibling;
            }

            return newHead;
        }

        private static <T extends Comparable<T>> Node<T> merge(
                BinomialHeap<T> heap1, BinomialHeap<T> heap2) {
            if (heap1.head == null) {
                return heap2.head;
            } else if (heap2.head == null) {
                return heap1.head;
            } else {
                Node<T> head;
                Node<T> heap1Next = heap1.head;
                Node<T> heap2Next = heap2.head;

                if (heap1.head.degree <= heap2.head.degree) {
                    head = heap1.head;
                    heap1Next = heap1Next.sibling;
                } else {
                    head = heap2.head;
                    heap2Next = heap2Next.sibling;
                }

                Node<T> tail = head;

                while (heap1Next != null && heap2Next != null) {
                    if (heap1Next.degree <= heap2Next.degree) {
                        tail.sibling = heap1Next;
                        heap1Next = heap1Next.sibling;
                    } else {
                        tail.sibling = heap2Next;
                        heap2Next = heap2Next.sibling;
                    }

                    tail = tail.sibling;
                }

                if (heap1Next != null)
                    tail.sibling = heap1Next;
                else
                    tail.sibling = heap2Next;

                return head;
            }
        }

        public void print() {
            System.out.println("Binomial tree:");
            if (head != null)
                head.print(0);
        }

        public static class Node<T extends Comparable<T>>
                implements Comparable<Node<T>> {
            public T key;
            public int degree;
            public Node<T> parent;
            public Node<T> child;
            public Node<T> sibling;

            public Node() {
                key = null;
            }

            public Node(T key) {
                this.key = key;
            }

            public int compareTo(Node<T> other) {
                return this.key.compareTo(other.key);
            }

            public void print(int level) {
                Node<T> curr = this;
                while (curr != null) {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < level; i++) {
                        sb.append(" ");
                    }
                    sb.append(curr.key.toString());
                    System.out.println(sb.toString());
                    if (curr.child != null) {
                        curr.child.print(level + 1);
                    }
                    curr = curr.sibling;
                }
            }
        }
    }



## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: {{site.baseurl}}/2013/01/data-structure-binary-heap.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/data-structures/binomial-heap
