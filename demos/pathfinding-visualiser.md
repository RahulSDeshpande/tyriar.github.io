---
layout : plain-comments
title  : Pathfinding visualiser
sitemap:
 priority: 1.0
---

Write up on the algorithm can be found [here][1].

Here is a little demo I wrote to showcase A\*, it allows 8-way directional movement and uses the diagonal heuristic. Use the left click to place obstacles, the right click to remove obstacles and press the 'Run A\*' button to see the resulting path.

[Check out the code on GitHub][2].

<div style="margin: 10px;">
<div style="background-color: #2d2d30; border: 1px solid #FFF; float: left; height: 16px; margin-right: 5px; width: 16px;">
</div>
Obstacle
</div>
<div style="margin: 10px;">
<div style="background-color: #00cc00; border: 1px solid #FFF; float: left; height: 16px; margin-right: 5px; width: 16px;">
</div>
Path
</div>
<div style="margin: 10px;">
<div style="background-color: #4444ff; border: 1px solid #FFF; float: left; height: 16px; margin-right: 5px; width: 16px;">
</div>
Visited dode
</div>

<style>
#astar {
 margin:0 auto;
 display:block;
}

#astar:hover {
 cursor:crosshair;
}

#astar-info {
 border:1px #000 solid;
}
</style>

<br />
<section>
<canvas id="astar" oncontextmenu="return false;"><!----></canvas>
<div id="info">
</div>
<div>
<button id="run">Run A*</button>
<button id="clear">Clear</button>
</div>
</section>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="{{ site.baseurl }}/scripts/demos/pathfinding-visualiser.js" async="async"></script>



[1]: /2012/06/a-pathfinding-algorithm.html
[2]: https://github.com/Tyriar/canvas-astar.js
