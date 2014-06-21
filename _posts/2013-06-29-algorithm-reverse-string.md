---
layout      : post
title       : Reverse a string
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
gpluspost   : 1tgBfsayre2
intro       : This article looks at the interview question - <em>Reverse a string in the most efficient way possible. For example an input of <code>"abc123"</code> will result in the output <code>"321cba"</code></em>.
---

## Analysis

This is a very common interview question, it tests whether a candidate understands how string concatenation and immutability works. A simple algorithm that does the job loops through each character and constructs a string in reverse order.

<pre>
function reverse (text)
  define result &larr; ""
  foreach character c in text
    result &larr; c + result
  return result
</pre>

The above algorithm is not very efficient though. This is because strings are immutable which means they cannot be modified after they are created. The algorithm creates a new string every iteration which takes worst case \\(O(n)\\), making the algorithm \\(O(n^2)\\).

The string can be reversed in \\(O(n)\\) time with a couple of different methods: using `StringBuilder` to construct the string as above, or by converting the string to a character array and back.



## Code

[View on GitHub][1]

### Char array

<!--prettify lang=java-->
    String reverse(String text) {
        char[] charArray = text.toCharArray();
        int start = -1;
        int end = charArray.length;
        while (++start < --end) {
            char temp = charArray[start]; 
            charArray[start] = charArray[end];
            charArray[end] = temp;
        }
        return String.valueOf(charArray);
    }

### StringBuilder

<!--prettify lang=java-->
    String reverse(String text) {
        StringBuilder sb = new StringBuilder();
        for (int i = text.length() - 1; i >= 0; i--) {
            sb.append(text.charAt(i));
        }
        return sb.toString();
    }

or

<!--prettify lang=java-->
    public static String reverse(String text) {
        return new StringBuilder(text).reverse().toString();
    }

[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/reverse-string
