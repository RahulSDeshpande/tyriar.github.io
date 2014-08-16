---
layout      : post
title       : Integer division without the division operator (/)
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
gpluspost   : 5HvSNcVFwXt
intro       : This article looks at the interview question - <em>Implement a function that performs integer division on two integers without the use of the division <code>/</code> operator. For example for the input of <code>10</code> and <code>4</code> should result in the output of <code>2</code>.</em>
---

## Analysis

If you have not thought about this problem before you may be a little taken aback. It's actually a fairly simple problem, think about what division actually does, it counts how much of a certain number (the divisor) makes up another number (the dividend). One way we could do this using just the minus `-` operator is to count how many times you can subject the divisor from the dividend before `0` is reached.

There are two other cases we need to handle: the first is when the divisor is `0` and the second is negative numbers. When the divisor is `0` a good course of action is to throw an exception. For negative numbers, if either value is negative then the result will be negative, if both values are negative then the result will be positive.



## Code

[View on GitHub][1]

<!--prettify lang=java-->
    public static int divide(int a, int b) {
        if (b == 0)
            throw new IllegalArgumentException("Argument 'b' is 0");
        int sign = 1;
        if (a < 0) {
            a = -a;
            sign = -sign;
        }
        if (b < 0) {
            b = -b;
            sign = -sign;
        }
        int result = 0;
        while (a >= 0) {
            a -= b;
            result++;
        }
        return (result - 1) * sign;
    }



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/com/growingwiththeweb/algorithms/interviewQuestions/divideWithoutDivide
