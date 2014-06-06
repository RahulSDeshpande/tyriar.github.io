---
layout      : post
title       : Red-black tree
tags        : [Computer science, Data structure, Java, Tree]
socialimage : /images/2012/12/09/rbt.png
primarytag  : Data structure
intro       : The red-black tree is a type of self-balancing <a href="/2012/10/data-structures-binary-search-tree.html">binary search tree</a> that assigns a colour of red or black to each node. On every insert or delete, the tree re-organises itself so that it is approximately \(\log n\) nodes high, allowing search in \(O(\log n)\) time. The re-organising does not guarantee a perfectly balanced tree, it is however good enough to guarantee \(O(\log n)\) search.
---

{% include post-image.html class="right-col" alt="Red-black tree example" src="/images/2012/12/09/rbt.png" %}

Insert and delete are also performed in \\(O(\log n)\\) time. The 'fixup' operations where the balancing occurs after insert and delete have quite complex implementations as you will see below. This is because we need the properties of the red-black tree to hold otherwise it may not be balanced.

<div class="clear"><!----></div>



## Complexity

| Operation | Description                                     | Complexity      |
|-----------|-------------------------------------------------|-----------------|
| Delete    | Deletes a node given a key                      | \\(O(\log n)\\) |
| Insert    | Inserts a node with an associated key           | \\(O(\log n)\\) |
| Search    | Searches for and returns a node using its key   | \\(O(\log n)\\) |



## Representation

See [binary search tree][Binary search tree] for information on representing a binary tree.



## Properties

Here are the set of rules that a red-black tree must follow:

- Each node is either red or black
- The root node is black
- All leaf nodes (nil) are black
- Both children of every red node are black
- For each node, all paths from the node to descendant leaves contain the same number of black nodes



## Operations

### Rotation

Performing a left rotate and a right rotate on nodes is an important operation used in both delete and insert operations. Here is an illustration of the process:

{% include post-image.html class="center-aligned" alt="Rotation" src="/images/2012/12/09/rotate.png" %}

### Delete(<var>a</var>)

Delete performs a slightly modified binary search tree delete and then performs a fix-up function. Here are the cases that need to be fixed up if they occur.

1. The deleted node <var>a</var>'s sibling is red
2. The deleted node <var>a</var>'s sibling <var>b</var> is black and both of <var>b</var>'s children and black
3. The deleted node <var>a</var>'s sibling <var>b</var> is black, <var>b</var>'s left child is red and <var>a</var>'s right child is black
4. The deleted node <var>a</var>'s sibling <var>b</var> is black and <var>b</var>'s right child is red

### Insert(<var>a</var>)

Insert performs a slightly modified binary search tree insert and then performs a fix-up function. Here are the cases that need to be fixed up if they occur.

1. The inserted node <var>a</var>'s uncle is red
2. The inserted node <var>a</var>'s uncle is black and <var>a</var> is a right child
3. The inserted node <var>a</var>'s uncle is black and <var>a</var> is a left child

### Search(n)

For search we use the search operation on the regular binary search tree. Only now instead of having a worst case of \\(O(n)\\), it's \\(O(\log n)\\) as we balance the tree.



## Code

[View on GitHub][1]

<!--prettify lang=java-->
    public class RedBlackTree {
        private TreeNode root;

        public RedBlackTree() { }

        public void insert(int key) {
            TreeNode parent = null;
            TreeNode node = root;
            while (node != null && !node.isNilNode()) {
                parent = node;
                if (key < parent.getKey())
                    node = parent.getLeft();
                else 
                    node = parent.getRight();
            }
            if (parent == null) {
                node = new TreeNode(key, null);
                root = node;
            } else {
                node.setParent(parent);
                node.setKey(key);
                node.setNilNode(false);
                node.setColor(TreeNode.Color.RED);
            }
            node.setColor(TreeNode.Color.RED);
            insertFixup(node);
        }

        private void insertFixup(TreeNode node) {
            while (node.getParent() != null && 
                   node.getGrandparent() != null && 
                   node.getParent().getColor() == TreeNode.Color.RED) {

                if (node.getParent() == node.getGrandparent().getLeft()) {
                    TreeNode uncle = node.getGrandparent().getRight();
                    if (uncle.getColor() == TreeNode.Color.RED) {
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        uncle.setColor(TreeNode.Color.BLACK);
                        node = node.getGrandparent();
                        node.setColor(TreeNode.Color.RED);
                    } else {
                        if (node == node.getParent().getRight()) {
                            node = node.getParent();
                            rotateLeft(node);
                        }
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        node.getGrandparent().setColor(TreeNode.Color.RED);
                        rotateRight(node.getGrandparent());
                    }
                } else if (node.getParent() == node.getGrandparent().getRight()) {
                    TreeNode uncle = node.getGrandparent().getLeft();
                    if (uncle.getColor() == TreeNode.Color.RED) {
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        uncle.setColor(TreeNode.Color.BLACK);
                        node = node.getGrandparent();
                        node.setColor(TreeNode.Color.RED);
                    } else {
                        if (node == node.getParent().getLeft()) {
                            node = node.getParent();
                            rotateRight(node);
                        }
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        node.getGrandparent().setColor(TreeNode.Color.RED);
                        rotateLeft(node.getGrandparent());
                    }
                }
            }
            root.setColor(TreeNode.Color.BLACK);
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

        public void delete(int key) {
            TreeNode node = search(key);
            TreeNode y, x;
            if (node.getLeft().isNilNode() || node.getRight().isNilNode()) 
                y = node;
            else
                y = treeSuccessor(node);
            if (y.getLeft() != null && !y.getLeft().isNilNode())
                x = y.getLeft();
            else
                x = y.getRight();
            x.setParent(y.getParent());
            if (y.getParent() == null)
                root = x;
            else {
                if (y == y.getParent().getLeft())
                    y.getParent().setLeft(x);
                else
                    y.getParent().setRight(x);
            }
            if (y != node)
                node.setKey(y.getKey());
            if (y.getColor() == TreeNode.Color.BLACK)
                deleteFixup(x);
        }

        private void deleteFixup(TreeNode node) {
            while (node != root && node.getColor() == TreeNode.Color.BLACK) {
                if (node == node.getParent().getLeft()) {
                    TreeNode w = node.getParent().getRight();
                    if (w.getColor() == TreeNode.Color.RED) {
                        w.setColor(TreeNode.Color.BLACK);
                        node.getParent().setColor(TreeNode.Color.RED);
                        rotateLeft(node.getParent());
                    }
                    if (w.getLeft().getColor() == TreeNode.Color.BLACK && 
                        w.getRight().getColor() == TreeNode.Color.BLACK) {

                        w.setColor(TreeNode.Color.RED);
                        node = node.getParent();
                    } else  {
                        if (w.getRight().getColor() == TreeNode.Color.BLACK) {
                            w.getLeft().setColor(TreeNode.Color.BLACK);
                            w.setColor(TreeNode.Color.RED);
                            rotateRight(w);
                            w = node.getParent().getRight();
                        }
                        w.setColor(node.getParent().getColor());
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        w.getRight().setColor(TreeNode.Color.BLACK);
                        rotateLeft(node.getParent());
                        node = root;
                    }
                } else {
                    TreeNode w = node.getParent().getLeft();
                    if (w.getColor() == TreeNode.Color.RED) {
                        w.setColor(TreeNode.Color.BLACK);
                        node.getParent().setColor(TreeNode.Color.RED);
                        rotateRight(node.getParent());
                    }
                    if (w.getRight().getColor() == TreeNode.Color.BLACK && 
                        w.getLeft().getColor() == TreeNode.Color.BLACK) {

                        w.setColor(TreeNode.Color.RED);
                        node = node.getParent();
                    } else  {
                        if (w.getLeft().getColor() == TreeNode.Color.BLACK) {
                            w.getRight().setColor(TreeNode.Color.BLACK);
                            w.setColor(TreeNode.Color.RED);
                            rotateLeft(w);
                            w = node.getParent().getLeft();
                        }
                        w.setColor(node.getParent().getColor());
                        node.getParent().setColor(TreeNode.Color.BLACK);
                        w.getLeft().setColor(TreeNode.Color.BLACK);
                        rotateRight(node.getParent());
                        node = root;
                    }
                }
            }
            node.setColor(TreeNode.Color.BLACK);
        }

        private TreeNode treeSuccessor(TreeNode node) {
            if (node.getRight() != null && !node.isNilNode())
                return treeMinimum(node.getRight());
            TreeNode successor = node.getParent();
            while (successor != null && !successor.isNilNode() && 
                    node == successor) {
                node = successor;
                successor = node.getParent();
            }
            return successor;
        }

        private TreeNode treeMinimum(TreeNode node) {
            while (!node.getLeft().isNilNode() && !node.isNilNode())
                node = node.getLeft();
            return node;
        }

        public TreeNode search(int key) {
            if (root == null)
                return null;

            return search(key, root);
        }

        public TreeNode search(int key, TreeNode node) {
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
            if (root == null)
                return "(empty)";
            return root.toString();
        }
    }



## References

* <cite>Introduction to Algorithms (2nd ed.) (2001)</cite> - Cormen, Thomas H.; Leiserson, Charles E., Rivest, Ronald L., Stein, Clifford



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/data-structures/red-black-tree

[Red-black tree example]: http://3.bp.blogspot.com/-DVjfNqUa4lc/UMQgN7I0EmI/AAAAAAAAK4Y/-5ZVq2txDQ0/s1600/rbt.png
[Rotation]: https://googledrive.com/host/0B-wUQaw640vCRmR5RDh0ckJhRDQ

[Binary heap]: {{site.baseurl}}/2013/01/data-structure-binary-heap.html
[Binary search tree]: {{site.baseurl}}/2012/10/data-structures-binary-search-tree.html
[Splay tree]: {{site.baseurl}}/2013/06/data-structure-splay-tree.html
[Red-black tree]: {{site.baseurl}}/2012/12/data-structure-red-black-tree.html
