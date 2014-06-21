---
layout      : post
title       : Splay tree
tags        : [Computer science, Data structure, Java, Tree]
isfeatured  : 1
preview     : /images/2013/06/09/zig-zag-left.svg
socialimage : /images/2013/06/09/preview.png
primarytag  : Data structure
gpluspost   : LpNbLm7ncmx
intro       : The splay tree is a type of self-adjusting binary search tree like the <a href="/2012/12/data-structure-red-black-tree.html">red-black tree</a>. What makes the splay tree special is its ability to access recently accessed elements faster. Whenever an operation is performed, the tree performs an operation called <em>splaying</em> which pulls the element to the top of the tree.
---

{% include post-image.html class="right-col fit-col" alt="Worst case" src="/images/2013/06/09/worst-case.svg" %}

The worst case height of a splay tree is \\(n\\), this could be the case if all nodes were accessed in ascending order for example.

This makes the worst case complexity of the splay tree's operations \\(O(n)\\). Since all operations also splay the tree on the node, the tree ends up roughly balancing itself, this results in a \\(O(\log n)\\) amortised worst case time complexity for all operations.

The splay tree is a particularly good choice as a data structure when it's likely that the same nodes will be accessed multiple times in a short period. This is where the real power in the splay tree lies, in its ability to hoist nodes up to the root when they are accessed, giving speedy access for nearby successive accesses.

<div class="clear"><!----></div>



## Complexity

| Operation | Description                                               | Complexity        |
|-----------|-----------------------------------------------------------|-------------------|
| Delete    | Deletes a node given a key                                | \\(O(\log n)\\)\* |
| Insert    | Inserts a node with an associated key                     | \\(O(\log n)\\)\* |
| Search    | Searches for and returns a node using its key             | \\(O(\log n)\\)\* |
| Splay     | Reorganises the tree, moving a particular node to the top | \\(O(\log n)\\)\* |

\* *Amortised*

## Representation

See the [<abbr title="Binary Search Tree">BST</abbr> article][2] for information on representing a binary tree.



## Parallelism

Due to the splay tree adjusting itself even after a "read-only" operation, the splay tree is probably not ideal in a multi-threaded application. If parallelism is desired, additional guards need to be put in place to protect against race conditions.



## Operations

### Rotation

The generic tree rotation operation is used to perform the below splaying operations. Here is an illustration of the process.

{% include post-image.html class="center-aligned" alt="Rotation" src="/images/2013/06/09/rotation.svg" %}

### Splay(<var>a</var>)

The splay operation is performed to bring the node <var>a</var> that is being worked on to the root of the tree. It performs a series of operations called zig, zig-zig and zig-zag depending on the characteristics of <var>a</var>. Each operation has two variants depending on whether <var>a</var> or its parent are left or right children.

#### Zig(<var>a</var>)

This operation is performed when the parent of <var>a</var> is the root of the tree. A left or right rotate is performed to bring <var>a</var> to the root of the tree.

{% include post-image.html class="center-aligned" alt="Zig operation" src="/images/2013/06/09/zig.svg" %}

#### Zig-zig(<var>a</var>)

This operation is performed when <var>a</var> and its parent are the same child type as each other (both left children or both right children). It performs either two right rotations or two left rotations depending on the side. Its name is derived from the fact that the rotations performed are of the same type.

{% include post-image.html class="center-aligned" alt="Zig-zig operation" src="/images/2013/06/09/zig-zig.svg" %}

#### Zig-zag(<var>a</var>)

This operation is performed when <var>a</var> is a different child type to its parent. It performs a rotation of both types (left then right, or right then left) depending on the child type of <var>a</var>.

{% include post-image.html class="center-aligned" alt="Zig-zig operation" src="/images/2013/06/09/zig-zag-left.svg" %}
{% include post-image.html class="center-aligned" alt="Zig-zig operation" src="/images/2013/06/09/zig-zag-right.svg" %}

### Delete(<var>a</var>)

Delete can be implemented two different ways:

- by performing a regular [<abbr title="Binary Search Tree">BST</abbr>][2] delete on the node <var>a</var> and then splaying the tree on what was <var>a</var>'s parent, or
- by splaying the node <var>a</var> and then performing a regular [<abbr title="Binary Search Tree">BST</abbr>][2] delete on the <var>a</var>.

### Insert(<var>a</var>)

Insert performs a regular [<abbr title="Binary Search Tree">BST</abbr>][2] insert and then splays the tree on the node <var>a</var>, adjusting the tree so that the inserted node is at the root of the tree.

### Search(<var>a</var>)

Search performs a regular [<abbr title="Binary Search Tree">BST</abbr>][2] search and then splays the tree on the node <var>a</var>, adjusting the tree so that the searched node is at the root of the tree.



## Code

[View on GitHub][3]

<!--prettify lang=java-->
    public class SplayTree {
        private TreeNode root;

        public SplayTree() { }

        private void splay(TreeNode node) {
            while (node.parentExists()) {
                TreeNode parent = node.getParent();
                if (!parent.parentExists()) {
                    if (parent.getLeft() == node) {
                        rotateRight(parent);
                    } else {
                        rotateLeft(parent);
                    }
                } else {
                    TreeNode gparent = parent.getParent();
                    if (parent.getLeft() == node && gparent.getLeft() == parent) {
                        rotateRight(gparent);
                        rotateRight(node.getParent());
                    } else if (parent.getRight() == node && 
                            gparent.getRight() == parent) {
                        rotateLeft(gparent);
                        rotateLeft(node.getParent());
                    } else if (parent.getLeft() == node && 
                            gparent.getRight() == parent) {
                        rotateRight(parent);
                        rotateLeft(node.getParent());
                    } else {
                        rotateLeft(parent);
                        rotateRight(node.getParent());
                    }
                }
            }
        }

        private void rotateLeft(TreeNode x) {
            TreeNode y = x.getRight();
            x.setRight(y.getLeft());
            if (y.getLeft() != null)
                y.getLeft().setParent(x);
            y.setParent(x.getParent());
            if (x.getParent() == null)
                root = y;
            else {
                if (x == x.getParent().getLeft())
                    x.getParent().setLeft(y);
                else
                    x.getParent().setRight(y);
            }
            y.setLeft(x);
            x.setParent(y);
        }
        
        private void rotateRight(TreeNode x) {
            TreeNode y = x.getLeft();
            x.setLeft(y.getRight());
            if (y.getRight() != null)
                y.getRight().setParent(x);
            y.setParent(x.getParent());
            if (x.getParent() == null)
                root = y;
            else {
                if (x == x.getParent().getLeft())
                    x.getParent().setLeft(y);
                else
                    x.getParent().setRight(y);
            }
            y.setRight(x);
            x.setParent(y);
        }

        public void insert(int key) {
            if (root == null) {
                root = new TreeNode(key, null);
                return;
            }

            insert(key, root);
            search(key);
        }

        private void insert(int key, TreeNode node) {
            if (key < node.getKey()) {
                if (node.leftExists())
                    insert(key, node.getLeft());
                else
                    node.setLeft(new TreeNode(key, node));
            }

            if (key > node.getKey()) {
                if (node.rightExists())
                    insert(key, node.getRight());
                else
                    node.setRight(new TreeNode(key, node));
            }
        }

        public void delete(int key) {
            if (root == null)
                return;

            search(key);
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

            TreeNode node = search(key, root);
            splay(node);
            return node != null;
        }

        private TreeNode search(int key, TreeNode node) {
            if (key == node.getKey())
                return node;

            if (key < node.getKey()) {
                if (!node.leftExists())
                    return null;
                return search(key, node.getLeft());
            }

            if (key > node.getKey()) {
                if (!node.rightExists())
                    return null;
                return search(key, node.getRight());
            }

            return null;
        }

        public String toString() {
            return root.toString();
        }
    }



[2]: {{site.baseurl}}/2012/10/data-structures-binary-search-tree.html
[3]: https://github.com/Tyriar/growing-with-the-web/tree/master/data-structures/splay-tree
