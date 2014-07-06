---
layout      : post
title       : A* pathfinding algorithm
tags        : [Algorithm, Artificial intelligence, Computer science, Graph, Pathfinding, Searching]
isfeatured  : 1
preview     : /images/2012/06/03/grid-example.png
socialimage : /images/2012/06/03/grid-example.png
primarytag  : Algorithm
intro       : Game development introduced me to programming when I was around 10 years old, and I've loved it ever since. One of the first formal algorithms I learned before entering university was A* (pronounced A-star), and I really had a great time doing learning about it. It's one of the most widely used pathfinding algorithms and is one that you would likely be introduced to first when approaching the subject of pathfinding. A pathfinding algorithm takes a start point (also referred to as a node) and a goal and attempts to make the shortest path between the two given possible obstacles blocking the way.
---

{% include post-image.html class="center-aligned" alt="Grid example" src="/images/2012/06/03/grid-example.png" %}

I've always thought the simplest example of pathfinding is a 2D grid in a game, but it can be used to find a path from A to B on any type of graph. For example a graph where vertices are airports and edges are flights, A\* could be used to get the shortest trip between one airport and another.

{% include post-image.html class="center-aligned" alt="Graph example" src="/images/2012/06/03/graph-example.png" %}

## Properties

A* has the following properties:

- It is complete; it will always find a solution if it exists.
- It can use a heuristic to significantly speed up the process.
- It can have variable node to node movement costs. This can be used when some nodes are more difficult to traverse, for example you may move slower across rocky terrain or up hill.
- It can search in many different directions if desired.

## How it works

It works by maintaining two lists; the open list and the closed list. The open list initially contains the start node, it contains all nodes that are yet to be considered. If the open list becomes empty then there is no possible path. The closed list starts out empty and contains all nodes that have already been considered/visited.

The core loop of the algorithm selects a node from the open list with the lowest estimated cost to reach the goal. If the selected node is not the goal it puts all valid neighboring nodes into the open list and repeats the process.

Part of the magic in the algorithm is that all nodes that are created keep a reference to their parent. This means that from any node we can track backwards to get a path from the node and the start node.

## Node

A node has a positioning value (eg. x, y), a reference to its parent and three 'scores' associated with it. These scores are how A* determines which nodes to consider first.

### G score

The g score is the base score of the node and is simply the incremental cost of moving from the start node to this node.

$$g(n) = g(n.parent) + cost(n.parent, n)$$

$$cost(n_1, n_2) = \text{the movement cost from }n_1\text{ to }n_2$$

### H score - the heuristic

The heuristic is a computationally easy estimate of the distance between each node and the goal. This being computationally easy is very important as the H score will be calculated *at least* once for every node considered before the goal is reached. The implementation of the H score can vary depending on the properties of the graph that is being searched, here are the most common heuristics.

#### Manhattan distance

This is the simplest heuristic and is ideal for grids that allow 4-way movement (up, down, left, right).

$$h(n) = \|n.x - goal.x\| + \|n.y - goal.y\|$$

{% include post-image.html class="center-aligned" alt="Manhattan distance" src="/images/2012/06/03/manhattan-distance.png" %}

#### Diagonal distance (uniform cost)

This heuristic is used for 8-way movement (diagonals) when the cost of diagonal movement is the same as the cost of non-diagonal. Note that this is *very* inaccurate if the costs for diagonal and non-diagonal are not the same.

$$h(n) = c\cdot max(\|n.x - goal.x\|, \|n.y - goal.y\|)$$

$$c = \text{cost of movement}$$

{% include post-image.html class="center-aligned" alt="Diagonal distance (uniform cost)" src="/images/2012/06/03/diagonal-distance-uniform-cost.png" %}

#### Diagonal distance

This heuristic is used for 8-way movement when the cost of diagonal movement differs from the non-diagonal cost. Remember that the cost of diagonal distance doesn't need to be exact and is usually worth it to use a constant multiplier rather than the square root as the square root operation is quite expensive.

$$h(n) = c\_d d\_{min} + c\_n ( d\_{max} - d\_{min})$$

$$d\_{max} = max(\|n.x - goal.x\|, \|n.y - goal.y\|)$$

$$d\_{min} = min(\|n.x - goal.x\|, \|n.y - goal.y\|)$$

$$c\_n = \text{cost of non-diagonal movement}$$

$$c_d = \text{cost of diagonal movement} = c_n \sqrt{2} \approx c_n \cdot 1.414$$

{% include post-image.html class="center-aligned" alt="Diagonal distance" src="/images/2012/06/03/diagonal-distance.png" %}

#### Euclidean distance

This heuristic can be used when movement is possible at any angle, it can also be quite expensive and may be worth considering a less expensive function.

$$h(n) = \sqrt{(n.x - goal.x)^2 + (n.y - goal.y)^2}$$

You should avoid using the square root all together and calculate \\(h(n)^2\\). Then make sure that \\(g(n)^2\\) is used to ensure both are relative.

$$h(n)^2 = (n.x - goal.x)^2 + (n.y - goal.y)^2$$

{% include post-image.html class="center-aligned" alt="Euclidean distance" src="/images/2012/06/03/euclidean-distance.png" %}

### F score

The f score is simply the addition of g and h scores and represents the total cost of the path via the current node.

$$f(n) = g(n) + h(n)$$

## Pseudocode

This psuedocode allows for 8-way directional movement.

    function A*(start, goal)
      open_list = set containing start
      closed_list = empty set
      start.g = 0
      start.f = start.g + heuristic(start, goal)
      while open_list is not empty
        current = open_list element with lowest f cost
        if current = goal
          return construct_path(goal) // path found
        remove current from open_list
        add current to closed_list
        for each neighbor in neighbors(current)
          if neighbor not in closed_list
            if neighbor is not in open_list
              add neighbor to open_list
            else
              openneighbor = neighbor in open_list
              if neighbor.g < openneighbor.g
                openneighbor.g = neighbor.g
                openneighbor.parent = neighbor.parent
      return false // no path exists

    function neighbors(node)
      neighbors = set of valid neighbors to node // check for obstacles here
      for each neighbor in neighbors
        if neighbor is diagonal
          neighbor.g = node.g + diagonal_cost // eg. 1.414 (pythagoras)
        else
          neighbor.g = node.g + normal_cost // eg. 1
        neighbor.parent = node
      return neighbors

    function construct_path(node)
      path = set containing node
      while node.parent exists
        node = node.parent
        add node to path
      return path

## Demo

See the algorithm in action along with Dijkstra's algorithm in the [pathfinding visualiser web app][1] I created. You can also view the source on [GitHub][2].

{% include post-image.html class="center-aligned" alt="A screenshot of the demo" src="/images/2012/06/03/demo.png" %}

[1]: {{site.baseurl}}/projects/pathfinding-visualiser/
[2]: https://github.com/Tyriar/pathfinding-visualiser
