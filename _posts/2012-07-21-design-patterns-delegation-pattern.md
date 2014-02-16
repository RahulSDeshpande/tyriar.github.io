---
layout      : post
title       : Delegation design pattern
tags        : [.NET, C#, Design pattern, Java, Software engineering, Structural design pattern, UML]
socialimage : /images/2012/07/21/preview.png
primarytag  : Design pattern
intro       : The delegation design pattern allows an object to delegate one or more tasks to a helper object. Two classes are used to achieve this; the delegate and delegator, both which realise a common interface. A method (or methods) on the interface represent the functionality to be delegated. A call to the delegator calls the matching function on the delegate.
---

While this seemingly just abstracts away some of the functionality into another class, the real power of this pattern comes when there are multiple delegates. The delegator typically has a method for each delegate that will convert the delegator to use that delegate.

It is useful for understanding to compare the delegation pattern to inheritance. Both are powerful reuse techniques with a few of key differences; inheritance is directly supported by today's object-oriented programming languages and enables the use of polymorphism, whereas the delegation pattern allows the delegate to be changed at run-time.

**Benefits**

- Clearly separates the different sets of functionality
- Run-time flexibility

**Drawbacks**

- Not as trivial as implementing inheritance



## `delegate` keyword in C&#35;

The `delegate` keyword may be useful for implementing the delegation pattern however the presence of the keyword does not mean C# supports the delegation design pattern. A delegate in C# is simply a type-safe function pointer.



## UML diagram

{% include post-image.html class="center-aligned" alt="Delegation UML diagram" src="/images/2012/07/21/delegation-uml.svg" %}


## Code examples

[View on GitHub][1]

### Java

<!--prettify lang=java-->
    interface DelegationInterface {
        void f();
    }

    class DelegateA implements DelegationInterface {
        public void f() { }
    }

    class DelegateB implements DelegationInterface {
        public void f() { }
    }

    class Delegator implements DelegationInterface {
        private DelegationInterface delegate;

        public void f() { delegate.f(); }
        public void toA() { delegate = new DelegateA(); }
        public void toB() { delegate = new DelegateB(); }
    }

### C&#35;

<!--prettify lang=csharp-->
    delegate void DelegateFunction();

    class Delegator
    {
        private DelegateFunction _function;

        public void F() { _function(); }

        public void ToA() { _function = A; }
        public void ToB() { _function = B; }

        private void A() { }
        private void B() { }
    }



## Usage examples

There are countless examples that exist, anything where an object may behave in at least two different ways are ideal candidates.

- An employee can be paid as full-time, part-time or casual
- A document can be printed to a black and white printer, a colour printer or the screen
- A game world can be displayed using a first-person view or a third-person view



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/delegation

[Delegation UML diagram]: https://googledrive.com/host/0B-wUQaw640vCWmpHUWp3aUFFalU
