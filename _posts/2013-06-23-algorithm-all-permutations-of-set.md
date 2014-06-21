---
layout      : post
title       : All permutations of a set
tags        : [Algorithm, Computer science, Interview questions, Java]
primarytag  : Interview questions
gpluspost   : 8DQLGFMSZbN
intro       : This article looks at the interview question - <em>Implement a function that gets all possible <em>permutations</em> (or orderings) of the characters in a string. For example for the input string <code>"abc"</code>, the output will be <code>"abc"</code>, <code>"acb"</code>, <code>"bac"</code>, <code>"bca"</code>, <code>"cab"</code> and <code>"cba"</code>.</em>
---

## Analysis

This problem is very similar to [all combinations of a set][1], though the actual computing of the values will be quite different. Let's start by defining the inputs and outputs.

<!--prettify lang=java-->
    ArrayList<String> getPermutations(String characters);

Now let's look at how this problem is naturally solved. When I write down a set of permutations by hand, I tend to start with the first letter (`a`), and then find all permutations without that letter in it. So for `"abc"` I would write:

<pre>
a bc
a cb
b ac
b ca
c ab
c ba
</pre>

This approach can be translated exactly into a recursive function in which for all letters in a string, we pull the letter out of the string and prepend it to all permutations of the string without that letter in it. The base case when the string is a single character will return the character.

<pre>
permutations(abc) = a + permutations(bc) +
                    b + permutations(ac) +
                    c + permutations(ab)

permutations(ab)  = a + permutations(b) +
                    b + permutations(a)

permutations(a)   = a
</pre>



## Pseudocode

<pre>
function getPermutations (string text)
  define results as string[]
  if text is a single character
    add the character to results
    return results
  foreach char c in text
    define innerPermutations as string[]
    set innerPermutations to getPermutations (text without c)
    foreach string s in innerPermutations
      add c + s to results
  return results
</pre>



## Complexity

Much like [all combinations of a set][1], the time and space complexity of the above algorithm should be the same as the number of items produced. The number of unique permutations of any set of size \\(n\\) is \\(n!\\), therefore our algorithm is \\(O(n!)\\).



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public static ArrayList<String> getPermutations(String text) {
        ArrayList<String> results = new ArrayList<String>();

        // the base case
        if (text.length() == 1) {
            results.add(text);
            return results;
        }
        
        for (int i = 0; i < text.length(); i++) {
            char first = text.charAt(i);
            String remains = text.substring(0, i) + text.substring(i + 1);
            
            ArrayList<String> innerPermutations = getPermutations(remains);
            
            for (int j = 0; j < innerPermutations.size(); j++)
                results.add(first + innerPermutations.get(j));
        }
        
        return results;
    }

[1]: {{site.baseurl}}/2013/06/algorithm-all-combinations-of-set.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/algorithms/interview-questions/permutations-of-a-set
