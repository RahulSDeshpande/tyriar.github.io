---
layout      : post
title       : Converting a type name into a readable string
tags        : [.NET, C#, Extension method, Generics]
primarytag  : C#
intro       : Ever wanted to print a type name as text that the would be suitable for users? For example, converting the type name <code>"SomeTypeName"</code> to <code>"Some type name"</code>. I've come up with a pretty nice method to convert type names in to nice strings. 
---

The algorithm loops through each character in the string and determines whether to place the character as lower case or upper case and whether to insert a space based on the casing of the character and those surrounding it. 

## Examples

- "TypeName" &rarr; "Type name"
- "ABCTypeName" &rarr; "ABC type name"
- "TypeABCName" &rarr; "Type ABC name"
- "IMakeStuff" &rarr; "I make stuff"

## Code

Here is an [extension method][1] on `string` that takes a type name in the above format and outputs a nicer string. 

<!--prettify lang=csharp-->
    public static string TypeNameToString(this string text)
    {
        var builder = new StringBuilder();
        var typeName = text;
        int index = -1;

        while (++index < typeName.Length)
        {
            char nextChar = typeName[index];
            if (char.IsUpper(nextChar) && index != 0)
            {
                if (char.IsLower(typeName[index - 1]))
                {
                    if (typeName.Length > index + 1 && 
                        char.IsLower(typeName[index + 1]))
                    {
                       nextChar = char.ToLower(nextChar);
                    }
                    builder.Append(' ');
                }
                else if (typeName.Length > index + 1 && 
                         char.IsLower(typeName[index + 1]))
                {
                    builder.Append(' ');
                    nextChar = char.ToLower(nextChar);
                }
            }
            builder.Append(nextChar);
        }

        return builder.ToString();
    }

The above can also be combined with a [generic `enum`][2] and `Type` extension method for more convenient `enum` value and `Type` name conversion. 

<!--prettify lang=csharp-->
    public static string ToNiceString<TEnum>(this TEnum val)
        where TEnum : struct, IConvertible, IComparable, IFormattable
    {
        if (!typeof(TEnum).IsEnum)
        {
            throw new ArgumentException("TEnum must be an enum.");
        }

        return Enum.GetName(typeof(TEnum), val).TypeNameToString();
    }

    public static string ToNiceString(this Type type)
    {
        return type.Name.TypeNameToString();
    }

The code is also up on [GitHub][3].



[1]: {{site.baseurl}}/2012/08/extension-methods.html
[2]: {{site.baseurl}}/2013/02/using-enum-as-generic-type.html
[3]: https://github.com/Tyriar/TypeNameToString.cs