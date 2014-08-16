---
layout      : post
title       : Binary search tree
tags        : [Computer science, Data structure, Java, Tree]
isfeatured  : 1
preview     : /images/2012/10/24/representation-children.png
socialimage : /images/2012/10/24/representation-children.png
primarytag  : Data structure
intro       : A binary search tree (BST) is a node-based tree data structure in which each node can have at most two children, it supports several operations common to any search tree such as search, insert and delete. Operations on a BST always start at the root node and work their way down, because of this they take time based on how high the tree is. For example a tree with n nodes where there are no right children will take \(O(n)\) time, a complete BST however (every level except the last is completely filled, with nodes on the last as left as possible) has the worst case time of \(O(\log n)\).
---

## Complexity

| Operation | Description                                   | Complexity   |
|-----------|-----------------------------------------------|--------------|
| Delete    | Deletes a node given a key                    | \\(O(n)\\)\* |
| Insert    | Inserts a node with an associated key         | \\(O(n)\\)\* |
| Search    | Searches for and returns a node using its key | \\(O(n)\\)\* |

\* *\\(O(\log n)\\)* average case



## Representation

There are two main ways of representing a binary tree. The first is using node objects that have references to their children.

{% include post-image.html class="center-aligned" alt="Representation 1" src="/images/2012/10/24/representation-children.png" %}

The second is using a regular array and manipulating the index of the node to find its children. The index of the left child of a node is \\(2i + 1\\) and the index of the right being \\(2i + 2\\) where \\(i\\) is the index of the parent.

{% include post-image.html class="center-aligned" alt="Representation 2" src="/images/2012/10/24/array-representation.svg" %}



## Properties

- For each node \\(x\\), every value found in the left sub-tree of \\(x\\) is less than or equal to the value found in \\(x\\).
- For each node \\(x\\), every value found in the right sub-tree of \\(x\\) is greater than or equal to the value found in \\(x\\).



## Operations

### Delete(<var>n</var>)

The delete operation looks at the root node and compares its value with \\(n\\). If the node is equal to <var>n</var> then this node is selected for deletion, if <var>n</var> is less than the node it moves to the left node, if <var>n</var> is greater than the node it moves to the right now. This continues until a node has been selected for deletion.

When a node has been selected for deletion the tree needs to be reorganised depending on how many children the node being deleted had.

- If the node has no children then it is simply deleted.
- If the node has only a left child node then move the left child to the deleted node's position.
- If the node has only a right child node then move the right child to the deleted node's position.
- If the node has both children then the minimum node from the right sub-tree is moved to the deleted node's position. If the minimum node had a right child then it is moved into the minimum node's old position.

These images illustrate Delete(5) which has both left and right children.

{% include post-image.html class="center-aligned" alt="Delete 1" src="/images/2012/10/24/delete.png" %}

{% include post-image.html class="center-aligned" alt="Delete 2" src="/images/2012/10/24/delete-result.png" %}

### Insert(<var>n</var>)

The insert operation first looks at the root node and compares its value with <var>n</var>. If <var>n</var> is less than the root node it moves to the left node, if <var>n</var> is greater than the root node it moves to the right node. This continues until the left or right children do not exist, then it is inserted in that position.

### Search(<var>n</var>)

The search operation follows the same process as insert to find whether <var>n</var> exists.



## Code

Here is a binary search tree implemented in Java.

[View on GitHub][1]

<!--prettify lang=java-->
    public class BinarySearchTree {
        private TreeNode root;

        public BinarySearchTree() { }

        public void insert(int key) {
            if (root == null) {
                root = new TreeNode(key);
                return;
            }

            insert(key, root);
        }

        private void insert(int key, TreeNode node) {
            if (node == null) {
                node = new TreeNode(key);
                return;
            }

            if (key < node.getKey()) {
                if (node.leftExists())
                    insert(key, node.getLeft());
                else
                    node.setLeft(new TreeNode(key));
            }

            if (key > node.getKey()) {
                if (node.rightExists())
                    insert(key, node.getRight());
                else
                    node.setRight(new TreeNode(key));
            }
        }

        public void delete(int key) {
            if (root == null)
                return;

            delete(key, root);
        }

        private void delete(int key, TreeNode node) {
            if (key < node.getKey()) {
                if (node.leftExists())
                    delete(key, node.getLeft());
                if (node.getLeft().isDeleted())
                    node.setLeft(null);
                return;
            }

            if (key > node.getKey()) {
                if (node.rightExists())
                    delete(key, node.getRight());
                if (node.getRight().isDeleted())
                    node.setRight(null);
                return;
            }

            delete(node);
        }

        private void delete(TreeNode node) {
            if (!(node.leftExists() || node.rightExists())) {
                node.setDeleted(true);
                return;
            }

            if (node.leftExists() && !node.rightExists()) {
                node.setKey(node.getLeft().getKey());
                if (node.getLeft().rightExists())
                    node.setRight(node.getLeft().getRight());
                if (node.getLeft().leftExists())
                    node.setLeft(node.getLeft().getLeft());
                else
                    node.setLeft(null);
                return;
            }

            if (node.rightExists() && !node.leftExists()) {
                node.setKey(node.getRight().getKey());
                if (node.getRight().leftExists())
                    node.setLeft(node.getLeft().getLeft());
                if (node.getRight().rightExists())
                    node.setRight(node.getLeft().getRight());
                else
                    node.setRight(null);
                return;
            }

            // both exist, replace with minimum from right sub-tree
            int min = findMin(node.getRight());
            node.setKey(min);
        }

        private int findMin(TreeNode node) {
            if (!node.leftExists()) {
                node.setDeleted(true);
                return node.getKey();
            }

            int min = findMin(node.getLeft());
            if (node.getLeft().isDeleted())
                node.setLeft(null);
            return min;
        }

        public boolean search(int key) {
            if (root == null)
                return false;

            return search(key, root);
        }

        private boolean search(int key, TreeNode node) {
            if (key == node.getKey())
                return true;

            if (key < node.getKey()) {
                if (!node.leftExists())
                    return false;
                return search(key, node.getLeft());
            }

            if (key > node.getKey()) {
                if (!node.rightExists())
                    return false;
                return search(key, node.getRight());
            }

            return false;
        }

        public String toString() {
            return root.toString();
        }
    }




[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/com/growingwiththeweb/dataStructures

[Binary heap]: {{site.baseurl}}/2013/01/data-structure-binary-heap.html
[Binary search tree]: {{site.baseurl}}/2012/10/data-structures-binary-search-tree.html
[Splay tree]: {{site.baseurl}}/2013/06/data-structure-splay-tree.html
[Red-black tree]: {{site.baseurl}}/2012/12/data-structure-red-black-tree.html
