---
layout      : post
title       : Implement a queue using 2 stacks
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
intro       : This article looks at the interview question - <em>Implement a queue using two stacks.</em>
---

## Analysis

A queue can actually be implemented using a single stack, this method makes use of recursion however which makes uses another stack of sorts, the call stack. This method involves popping each item off the queue and then recursively calling itself until the last element is found, on the way back down the call stack we push the items back on to the stack.

<pre>
queuepop()
  value &larr; stack.pop()
  if stack is empty
    return value
  else
    result &larr; queuepop()
    stack.push(value)
    return result
</pre>

This isn't very efficient though considering that the pop function is \\(O(n)\\), we can do better.

So how can we make use of the second stack to better the running time of the algorithm? Think about what a stack and a queue actually is, if we have a stack and reverse it, it will be in the order in which a queue would serve it up.

<table>
<tbody>
<tr><td></td><th scope="col">Push order</th><th scope="col">Pop order</th></tr>
<tr>
<th scope="row">Stack</th>
<td><code><strong>1, 2, 3, 4</strong></code></td>
<td><code>4, 3, 2, 1</code></td>
</tr>
<tr>
<th scope="row">Queue</th>
<td><code><strong>1, 2, 3, 4</strong></code></td>
<td><code><strong>1, 2, 3, 4</strong></code></td>
</tr>
<tr>
<th scope="row">Reversed stack</th>
<td><code>4, 3, 2, 1</code></td>
<td><code><strong>1, 2, 3, 4</strong></code></td>
</tr>
</tbody>
</table>

Luckily reversing a stack into another stack is a very trivial task; just transfer the elements of the first stack to the second stack. This is what's happening in the above "single stack" implementation. If there are two stack data structures available instead of the temporary call stack, the second stack can be used to cache the next \\(n\\) elements. Any new items added can just be pushed on to the first stack.

This method maintains two stacks, a good analogy of this process is to consider the first stack the "inbox" and the second stack the "outbox". When items are transferred from the inbox to the outbox, no more will be added until the outbox has been completely emptied.



## Pseudocode

<pre>
function queuepush (obj)
  stack1.push(obj)

function queuepop ()
  if stack2 is empty
    if stack1 is empty
      return null
    while stack1 is not empty
      stack2.push(stack1.pop())
  return stack2.pop()
</pre>



## Complexity

The push function is just a simple push on to the first stack which is \\(O(1)\\). The pop function's worst case will still be \\(O(n)\\), but only when the second stack is empty. If the second stack contains items however then the algorithm is \\(O(1)\\).



## Code

[View on GitHub][1]

<!--prettify lang=java-->
    class StackQueue<T> {
        Stack<T> s1 = new Stack<T>();
        Stack<T> s2 = new Stack<T>();

        void push(T obj) {
            s1.push(obj);
        }

        T pop() {
            if (s2.isEmpty()) {
                if (s1.isEmpty()) {
                    return null;
                }
                while (!s1.isEmpty()) {
                    s2.push(s1.pop());
                }
            }
            return s2.pop();
        }
    }

[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/two-stack-queue
