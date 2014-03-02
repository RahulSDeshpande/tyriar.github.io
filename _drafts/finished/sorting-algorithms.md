---
layout      : post
title       : Sorting algorithms
tags        : [Algorithm, Computer science, Sorting]
socialimage : 
primarytag  : Sorting
intro       : A sorting algorithm takes a list of items and sorts them in a particular order, most commonly alphabetically or numerical.
---

{% include post-image.html class="right-col" alt="A sorting algorithm" src="/_drafts/images/sorting-algorithms/sorting-algorithms.svg" %}

The study of sorting algorithms is a great way to improve your craft as a software developer. They provide simple algorithms on which complexity analysis can be practised and also introduce some clever solutions to a simple and understandable problem.

<div class='clear'><!----></div>



## Properties of a sorting algorithm

In addition to the [time and space complexity][1] of sorting algorithms, the below properties help define sorting algorithms.

| Property     | Description                                                                            |
|--------------|----------------------------------------------------------------------------------------|
| Adaptability | An adaptive sort's performance improves the more sorted the list is initially          |
| In-place     | An in-place sort requires a constant amount of additional space                        |
| Parallelism  | A parallel sort can split its workload between multiple workers                        |
| Stability    | A stable sort preserves the order of items in the list that evaluate to the same value |



[1]: {{ site.baseurl }}/2012/11/big-o-notation.html