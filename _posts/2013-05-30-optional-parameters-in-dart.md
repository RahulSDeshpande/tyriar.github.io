---
layout      : post
title       : Optional parameters in Dart
tags        : [Dart]
primarytag  : Dart
gpluspost   : YoKdg6oHnJh
intro       : Dart has two flavours of optional parameters, positional and named parameters.
---

## Optional positional parameters

Square brackets `[]` can be used to specify optional positional parameters. If optional positional parameters are defined, function calls may specify a variable number of arguments.

<!--prettify lang=dart-->
    void main() {
      test(1);
      test(1, 2);
      test(1, 2, 3);
    }

    void test(a, [b, c]) { }

## Optional named parameters

Curly braces `{}` can be used to specify optional named parameters. These differ to positional parameters in that their names must be specified in order to be passed. Names are specified using the syntax `parameter:value`

<!--prettify lang=dart-->
    void main() {
      test(1);
      test(1, b:2);
      test(1, b:2, c:3);

      test(1, 2); // compile error
    }

    void test(a, {b, c}) { }

## Checking if an optional parameter was specified

The syntax `?parameter` can be used to test whether an optional parameter was specified.

<!--prettify lang=dart-->
    bool wasOptionalParamSpecified([a]) => ?a;

Note that unspecified parameters are set as `null`, all the `?` syntax actually does is returns whether the parameter equals `null` as demonstrated by this program.

<!--prettify lang=dart-->
    void main() {
      test();     // false
      test(null); // true
      test(2);    // true
    }

    void test([a]) => print(?a);
