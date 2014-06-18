---
layout      : post
title       : Determine if a string is a palindrome
tags        : [Algorithm, Interview questions, Java]
primarytag  : Interview questions
gpluspost   : MRQnqhPY7Cu
intro       : This article looks at the interview question - <em>Determine if a string is a palindrome. A palindrome is a piece of text that is spelt the same when reversed.</em>
---

## Analysis

This problem can be trivially solved by looping through each character and checking it against the character on the opposite side. There is a problem with this though because half the work being done is redundant as it's checking all characters two times. Consider the palindrome `"madam"`, this algorithm would make the following comparisons:

<pre>m &harr; m
a &harr; a
d &harr; d
a &harr; a
m &harr; m</pre>

All that needs to be compared to prove it's a palindrome are the first two characters against the last two since the middle one does not need to be checked:

<pre>m &harr; m
a &harr; a</pre>

This leads us to our initial solution:

<pre>function isPalindrome (text)
  if text is null
    return false
  left &larr; 0
  right &larr; text.length - 1
  while (left &lt; right)
    if text[left] is not text[right]
      return false
    left &larr; left + 1
    right &larr; right - 1
  return true</pre>

If an interviewer ever asks this question, the above solution alone will likely not impress them too much. There are several ambiguities in the question that should be clarified before getting into the code. Failing to clarify the question could make you come off as someone who rushes the job without thinking too hard about what the *right* solution is. So the questions:

- Is the solution meant to be case sensitive?
- Do phrase palindromes need to be taken into account?
- What about punctuation?

The easiest and most elegant way to augment our code to take these new pieces of information into account is to use a regular expression. We can craft a <abbr title="Regular Expression">regex</abbr> that removes the spaces and punctuation. Then all that needs to be done is to transform the text into lowercase and pass the new string into the original solution.

<pre>function isPhrasePalindrome (text)
  remove regex "\[^a-zA-Z\]" from text
  text &larr; lowercase(text)
  return isPalindrome(text)</pre>

For those unfamiliar with <abbr title="Regular Expression">regex</abbr>, `[^a-zA-Z]` means to match characters (`[...]`) that are not (`^`) in the range a-z and A-Z (`a-zA-Z`).



## Complexity

An interviewer may ask about the time complexity for this algorithm to try and trick the candidate. The first function `isPalindrome` has a time complexity of \\(O(n / 2)\\) which is equal to \\(O(n)\\) since [Big-\\(O\\) notation ignores constant terms][1].

`isPhrasePalindrome` is also \\(O(n)\\) since string transformations are applied to each of the `text`'s characters.



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public static boolean isTextPalindrome(String text) {
        if (text == null) {
            return false;
        }
        int left = 0;
        int right = text.length() - 1;
        while (left < right) {
            if (text.charAt(left++) != text.charAt(right--)) {
                return false;
            }
        }
        return true;
    }

<!--prettify lang=java-->
    public static boolean isPhrasePalindrome(String text) {
        String chars = text.replaceAll("[^a-zA-Z]", "").toLowerCase();
        return isTextPalindrome(chars);
    }



[1]: {{ site.baseurl }}/2012/11/big-o-notation.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/palindrome-string
