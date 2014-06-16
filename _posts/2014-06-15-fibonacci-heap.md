---
layout      : post
title       : Fibonacci heap
tags        : [Computer science, Data structure, Generics, Heap, Java]
preview     : /images/2012/06/15/fibonacci-heap.png
socialimage : /images/2012/06/15/fibonacci-heap.svg
draft : 1
primarytag  : Data structure
intro       : A Fibonacci heap is a heap data structure similar to the <a href="/2014/01/binomial-heap.html">binomial heap</a>, only with a few modifications and a looser structure. The Fibonacci heap was designed in order to improve Dijkstra's shortest path algorithm from \\(O(m \log n)\\) to \\(O(m + n \log n)\\) by optimising the operations used most by the algorithm. Its name derives from the fact that the Fibonacci sequence is used in the complexity analysis of its operations.
---

{% include post-image.html class="right-col" alt="Fibonacci heap" src="/images/2014/06/15/fibonacci-heap.svg" %}

The primary difference of the Fibonacci heap is that it defers all 'clean up' operations to a point where they are more convenient, guaranteeing \(Θ(1)\) for several operations. Due to these deferred clean up steps, the worst case time complexity of the delete and extract minimum operations is \(O(n)\), however they are \(O(\log n)\) amortised.

*This article assumes some knowledge of the [binomial heap][1] data structure.*

*The animations in this article may not work in your browser, it has been tested in the latest Chrome and Firefox.*


## Time complexity

| Operation       | Description                                                   | Complexity         |
|-----------------|---------------------------------------------------------------|--------------------|
| Decrease key    | Decreases an existing key to some value                       | \\(Θ(1)\\)\*       |
| Delete          | Deletes a node given a reference to it                        | \\(O(\log n)\\)\*  |
| Extract minimum | Removes and returns the minimum value given a reference to it | \\(O(\log n)\\)\*  |
| Find minimum    | Returns the minimum value                                     | \\(Θ(1)\\)         |
| Insert          | Inserts a new value                                           | \\(Θ(1)\\)         |
| Union           | Combine the heap with another to form a valid Fibonacci heap  | \\(Θ(1)\\)         |

\* *Amortised*




## Structure

Like the binomial heap, a Fibonacci heap is a collection of *heap-ordered* trees. They do not need to be *binomial* trees however, this is where the relaxation of some of the binomial heap's properties comes in.

Each tree has an order just like the [binomial heap][2] that is based on the number of children. Nodes within a Fibonacci heap can be removed from their tree without restructuring them however, so the order does not necessarily indicate the maximum height of the tree, or number of nodes it contains.

{% include post-image.html class="stretch full-width" alt="Links" src="/images/2014/06/15/structure.svg" caption="Some examples of trees of order 0, 1 and 2 (the black nodes are 'marked')" %}



## Links

The pointers between nodes in a Fibonacci heap are very similar that of the binomial heap, only that each node in a Fibonacci heap contains a *doubly* linked list of all its children. This allows node removal and child list concatenation to both be performed in linear time.

{% include post-image.html class="center-aligned" alt="Links" src="/images/2014/06/15/links.svg" %}

Note that the child node whose parent links to it is always the node with the smallest value among its siblings.



## 'Marked' nodes

An important part of the Fibonacci Heap is how it marks nodes within the trees. The decrease key operation marks a node when its child is cut from a tree, this allows it to track some history about each node. Essentially the marking of nodes allows us to track whether:

* The node has had no children cut (unmarked)
* The node has had a single child cut (marked)
* The node is about to have a second child cut (removing a child of a marked node)

When a second child is cut from its parent, the parent is moved to the root list. This ensures that the structure of the Fibonacci heap does not stray too far from that of the binomial heap, which is one of the properties that enables the Fibonacci heap to achieve its amortised time bounds.



## Operations

### Find minimum

A pointer to minimum node of the root list is always kept up to date.

{% include post-image.html class="center-aligned" alt="Insert" src="/images/2014/06/15/find-minimum.svg" %}



### Insert

Insert creates a new tree containing only the new node which is being added to the heap. The total number of nodes in the tree \\(n\\) is incremented and the pointer to the minimum value is updated if necessary.

{% include post-image.html class="center-aligned" alt="Insert" src="/images/2014/06/15/insert.svg" %}

The insert operation of a fibonacci heap does not attempt to consolidate trees of equal order, opting instead to defer until a later time.



### Union

Union concatenates the root lists of two Fibonacci heaps and sets the minimum node to which ever tree's minimum node is smaller.

{% include svg-with-script.html class="center-aligned" alt="Union" src="/images/2014/06/15/union.anim.svg" width="480px" %}



### Decrease key

Decrease key lowers the key of a node. The node is then cut from the tree, joining the root list as its own tree. The parent of the node is then cut if it is marked, this continues for each anscestor until a parent that is not marked is encountered, which is then marked.

{% include svg-with-script.html class="center-aligned" alt="Decrease key" src="/images/2014/06/15/decrease-key.anim.svg" width="390px" caption="DecreaseKey(20, 1)" %}



### Extract minimum

Extract minimum is the most complex operation of a Fibonacci Heap as it's where the actions that were deferred by the other operations occur. It starts by removing the minimum node from the root list and adding its children to the root list.

{% include svg-with-script.html class="center-aligned" alt="Extract minimum" src="/images/2014/06/15/extract-min1.anim.svg" width="390px" %}

If the minimum was the only node in the root list, the pointer to the minimum node is set to the smallest node in the root list and the operation is completed. Otherwise, the 'consolidate' operation is performed which merges all trees of the same order together until there are no two trees with the same degree. The minimum is then set to the smallest node in the root list.

{% include svg-with-script.html class="center-aligned" alt="Consolidate" src="/images/2014/06/15/extract-min2.anim.svg" width="390px" %}



### Delete

Delete is performed by calling decrease key to reduce the node to negative infinity which pulls the node to the top of the tree. Extract minimum is then called on the node to remove it from the heap.



## Code

[View on GitHub][3]

<!--prettify lang=java-->
    public class FibonacciHeap<T extends Comparable<T>> {
        private Node<T> minNode;
        private int size;

        public FibonacciHeap() {
            size = 0;
            minNode = null;
        }

        private FibonacciHeap(Node<T> node) {
            size = 1;
            minNode = node;
        }

        private FibonacciHeap(Node<T> minNode, int size) {
            this.minNode = minNode;
            this.size = size;
        }

        public boolean isEmpty() {
            return minNode == null;
        }

        public void clear() {
            minNode = null;
        }

        public Node<T> insert(T key) {
            Node<T> node = new Node<T>(key);
            minNode = mergeLists(minNode, node);
            size++;
            return node;
        }

        public Node<T> findMinimum() {
            return minNode;
        }

        public void decreaseKey(Node<T> node, T newKey) {
            if (newKey.compareTo(node.key) > 0) 
                throw new IllegalArgumentException("New key is larger than old key.");
            
            node.key = newKey;
            Node<T> parent = node.parent;
            if (parent != null && node.compareTo(parent) < 0) {
                cut(node, parent);
                cascadingCut(parent);
            }
            if (node.compareTo(minNode) < 0)
                minNode = node;
        }

        private void cut(Node<T> node, Node<T> parent) {
            removeNodeFromList(node);
            parent.degree--;
            mergeLists(minNode, node);
            node.isMarked = false;
        }

        private void cascadingCut(Node<T> node) {
            Node<T> parent = node.parent;
            if (parent != null) {
                if (node.isMarked) {
                    cut(node, parent);
                    cascadingCut(parent);
                } else {
                    node.isMarked = true;
                }
            }
        }

        public void delete(Node<T> node) {
            // This is a special implementation of decreaseKey that sets the
            // argument to the minimum value. This is necessary to make generic keys
            // work, since there is no MIN_VALUE constant for generic types.
            node.isMinimum = true;
            Node<T> parent = node.parent;
            if (parent != null) {
                cut(node, parent);
                cascadingCut(parent);
            }
            minNode = node;
            
            extractMin();
        }

        public Node<T> extractMin() {
            Node<T> extractedMin = minNode;
            if (extractedMin != null) {
                // Set parent to null for the minimum's children
                if (extractedMin.child != null) {
                    Node<T> child = extractedMin.child;
                    do {
                        child.parent = null;
                        child = child.next;
                    } while (child != extractedMin.child);
                }

                Node<T> nextInRootList = minNode.next == minNode ? null : minNode.next;

                // Remove min from root list
                removeNodeFromList(extractedMin);
                size--;

                // Merge the children of the minimum node with the root list
                minNode = mergeLists(nextInRootList, extractedMin.child);
                
                if (nextInRootList != null) {
                    minNode = nextInRootList;
                    consolidate();
                }
            }
            return extractedMin;
        }

        private void consolidate() {
            List<Node<T>> aux = new ArrayList<Node<T>>();
            NodeListIterator<T> it = new NodeListIterator<T>(minNode);
            while (it.hasNext()) {
                Node<T> current = it.next();

                while (aux.size() <= current.degree + 1) {
                    aux.add(null);
                }

                // If there exists another node with the same degree, merge them
                while (aux.get(current.degree) != null) {
                    if (current.key.compareTo(aux.get(current.degree).key) > 0) {
                        Node<T> temp = current;
                        current = aux.get(current.degree);
                        aux.set(current.degree, temp);
                    }
                    linkHeaps(aux.get(current.degree), current);
                    aux.set(current.degree, null);
                    current.degree++;
                }

                while (aux.size() <= current.degree + 1) {
                    aux.add(null);
                }
                aux.set(current.degree, current);
            }

            minNode = null;
            for (int i = 0; i < aux.size(); i++) {
                if (aux.get(i) != null) {
                    // Remove siblings before merging
                    aux.get(i).next = aux.get(i);
                    aux.get(i).prev = aux.get(i);
                    minNode = mergeLists(minNode, aux.get(i));
                }
            }
        }

        private void removeNodeFromList(Node<T> node) {
            Node<T> prev = node.prev;
            Node<T> next = node.next;
            prev.next = next;
            next.prev = prev;

            node.next = node;
            node.prev = node;
        }

        private void linkHeaps(Node<T> max, Node<T> min) {
            removeNodeFromList(max);
            min.child = mergeLists(max, min.child);
            max.parent = min;
            max.isMarked = false;
        }

        // Union another fibonacci heap with this one
        public void union(FibonacciHeap<T> other) {
            minNode = mergeLists(minNode, other.minNode);
            size += other.size;
        }

        // Merged two lists and returns the minimum node
        public static <T extends Comparable<T>> Node<T> mergeLists(
                Node<T> a, Node<T> b) {

            // Assume a and b a
            if (a == null && b == null)
                return null;
            if (a == null)
                return b;
            if (b == null)
                return a;

            Node<T> temp = a.next;
            a.next = b.next;
            a.next.prev = a;
            b.next = temp;
            b.next.prev = b;

            return a.compareTo(b) < 0 ? a : b;
        }
        
        public void print() {
            System.out.println("Fibonacci heap:");
            if (minNode != null)
                minNode.print(0);
        }

        public static class Node<T extends Comparable<T>>
                implements Comparable<Node<T>> {

            private T key;
            private int degree;
            private Node<T> parent;
            private Node<T> child;
            private Node<T> prev;
            private Node<T> next;
            private boolean isMarked;
            private boolean isMinimum;

            public Node() {
                key = null;
            }

            public Node(T key) {
                this.key = key;
                next = this;
                prev = this;
            }

            public T getKey() {
                return key;
            }

            public int compareTo(Node<T> other) {
                return this.key.compareTo(other.key);
            }

            private void print(int level) {
                Node<T> curr = this;
                do {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < level; i++) {
                        sb.append(" ");
                    }
                    sb.append(curr.key.toString());
                    System.out.println(sb.toString());
                    if (curr.child != null) {
                        curr.child.print(level + 1);
                    }
                    curr = curr.next;
                } while (curr != this);
            }
        }

        // This Iterator is used to simplify the consolidate() method. It works by
        // gathering a list of the nodes in the list in the constructor since the
        // nodes can change during consolidation.
        public static class NodeListIterator<T extends Comparable<T>>
                implements Iterator<Node<T>> {

            private Queue<Node<T>> items = new LinkedList<Node<T>>();

            public NodeListIterator(Node<T> start) {
                if (start == null)
                    return;

                Node<T> current = start;
                do {
                    items.add(current);
                    current = current.next;
                } while (start != current);
            }

            public boolean hasNext() {
                return items.peek() != null;
            }

            public Node<T> next() {
                return items.poll();
            }

            public void remove() {
                throw new UnsupportedOperationException(
                        "NodeListIterator.remove is not implemented");
            }
        }
    }



## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: /2014/01/binomial-heap.html
[2]: /2014/01/binomial-heap.html#structure
[3]: https://github.com/Tyriar/growing-with-the-web/tree/master/data-structures/fibonacci-heap
