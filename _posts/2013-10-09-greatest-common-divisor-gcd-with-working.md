---
layout      : post
title       : Greatest common divisor (GCD) with working
tags        : [Algorithm, Java, Math]
primarytag  : Algorithm
gpluspost   : L5kca8zA19k
intro       : The one thing I hated about maths in school and university was the fact that I had to show my working. Of course I knew that it helped the marker see that you understood the problem, but I just found it incredibly tedious. Particularly when I knew the answer right after reading the question.
---

I recall back in university I was asked many times to find the greatest common divisor (GCD) of two integers using Euclid's algorithm. This is basically the exact situation I described above, you can work out the greatest common divisor in your head fairly easily with a smallish number but to actually show your working can take a quite a bit of writing.

<pre>
Find the greatest common divisor of 108 and 30

108 = 30 x 3 + 18
 30 = 18 x 1 + 12
 18 = 12 x 1 +  6
 12 =  6 x 2 +  0
       ^

gcd(108, 30) = 6
</pre>

So after doing it a couple of times I went ahead and spent a few minutes writing a little program that solved the problem with working shown. I lost the original source but have reproduced it for a little fun. :)

## Code

[View on GitHub][1]

<!--prettify lang=java-->
    public static int gcd(int a, int b) {
        int dividend;
        int divisor = (a > b ? a : b);
        int quotient;
        int remainder = (a < b ? a : b);

        System.out.format("Find gcd(%d, %d)\n", a, b);

        do {
            dividend = divisor;
            divisor = remainder;

            quotient = dividend / divisor;
            remainder = dividend % divisor;

            System.out.format(
                "%d = %d x %d + %d\n",
                dividend, divisor, quotient, remainder);
        } while (remainder != 0);

        System.out.format(
        	"\ngcd(%d, %d) = %d\n\n",
            a, b, divisor);

        return divisor;
    }

[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/com/growingwiththeweb/algorithms/math/gcd
