---
layout      : post
title       : Converting a string to the 'best-fitting' type
tags        : [C#, Extension method, Reflection, Stack Exchange]
primarytag  : C#
intro       : I answered a pretty interesting <a href="http://stackoverflow.com/questions/15173684/intelligent-type-conversion-in-net">question</a> on Stack Overflow yesterday, creating a method that takes a <code>string</code> and returns the value converted to the 'best-fitting' type out of a set of types boxed in <code>dynamic</code>.
---

Here is the full question:

> I have been playing around with converting a string to a value type in .NET, where the resulting value type is unknown. The problem I have encountered in my code is that I need a method which accepts a string, and uses a "best fit" approach to populate the resulting value type. Should the mechanism not find a suitable match, the string is returned.
>
> This is what I have come up with:
>

<!--prettify lang=csharp-->
    public static dynamic ConvertToType(string value)
    {
        Type[] types = new Type[]
        {
            typeof(System.SByte),
            typeof(System.Byte),
            typeof(System.Int16),
            typeof(System.UInt16),
            typeof(System.Int32),
            typeof(System.UInt32),
            typeof(System.Int64),
            typeof(System.UInt64),
            typeof(System.Single),
            typeof(System.Double),
            typeof(System.Decimal),
            typeof(System.DateTime),
            typeof(System.Guid)
        };
        foreach (Type type in types)
        {
             try
             {
                   return Convert.ChangeType(value, type);
             }
             catch (Exception)
             {
                 continue;
             }
        }
        return value;
    }

>
> I feel that this approach is probably not best practice because it can only match against the predefined types.
>
> Usually I have found that .NET accommodates this functionality in a better way than my implementation, so my question is: are there any better approaches to this problem and/or is this functionality implemented better in .NET?
>
> <footer><cite><a href="http://stackoverflow.com/questions/15173684/intelligent-type-conversion-in-net">Intelligent type conversion in .NET</a></cite>, <a href="http://stackoverflow.com/users/1033686/series0ne">series0ne</a></footer>

It's an Interesting idea but the code above has one major flaw, if `value` happens to be some GUID then the method will throw 12 exceptions before returning the `string` converted to a `System.GUID` boxed in `dynamic`. Immediately I thought awesome, another opportunity to use reflection! :)

Each of the types contain a [static method `TryParse`][5] which takes a string as the first argument and `out T` where `T` is the type as the second parameter. We can use this to our advantage by extracting the method using reflection.

<!--prettify lang=csharp-->
    var obj = Activator.CreateInstance(type);
    var methodParameterTypes = new Type[] { typeof(string), type.MakeByRefType() };
    var method = type.GetMethod("TryParse", methodParameterTypes);
    var methodParameters = new object[] { value, obj };

`method` can now be Invoked which will return a `bool` showing whether the parse was successful. If so the value will be in `methodParameters[1]`.

<!--prettify lang=csharp-->
    bool success = (bool)method.Invoke(null, methodParameters);

    if (success)
    {
        return methodParameters[1];
    }

I made a couple of other improvements, namely making the method an extension method on `string` and pulling the `Type[]` array out into a static property with lazy loading. I figure if this method is invoked once it will probably be many times. We could even go a step further and cache the methods for each `Type` as well. Below is the solution I provided, see my [full answer][4] here.

<!--prettify lang=csharp-->
    public static class StringExtensions
    {
        public static dynamic ConvertToType(this string value)
        {
            foreach (Type type in ConvertibleTypes)
            {
                var obj = Activator.CreateInstance(type);
                var methodParameterTypes =
                    new Type[] { typeof(string), type.MakeByRefType() };
                var method = type.GetMethod("TryParse", methodParameterTypes);
                var methodParameters = new object[] { value, obj };

                bool success = (bool)method.Invoke(null, methodParameters);

                if (success)
                {
                    return methodParameters[1];
                }
            }
            return value;
        }

        private static Type[] _convertibleTypes = null;

        private static Type[] ConvertibleTypes
        {
            get
            {
                if (_convertibleTypes == null)
                {
                    _convertibleTypes = new Type[]
                    {
                        typeof(System.SByte),
                        typeof(System.Byte),
                        typeof(System.Int16),
                        typeof(System.UInt16),
                        typeof(System.Int32),
                        typeof(System.UInt32),
                        typeof(System.Int64),
                        typeof(System.UInt64),
                        typeof(System.Single),
                        typeof(System.Double),
                        typeof(System.Decimal),
                        typeof(System.DateTime),
                        typeof(System.Guid)
                    };
                }
                return _convertibleTypes;
            }
        }
    }



[4]: http://stackoverflow.com/a/15174728/1156119
[5]: http://msdn.microsoft.com/en-au/library/h9y629c8(v=vs.80).aspx
