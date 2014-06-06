---
layout      : post
title       : Visitor design pattern
primarytag  : Design pattern
tags        : [Behavioural design pattern, Design pattern, Java, Software engineering, UML]
socialimage : /images/2014/01/06/preview.png
intro       : The visitor design pattern provides a method of separating an algorithm on an object and the object's actual class implementation. This allows the programmer to easily follow the open/closed principle.
---

The open/closed principle states;

> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification
>
> <footer><cite>Object-Oriented Software Construction</cite>, Bertrand Meyer</footer>

That is, modifying an entity's behaviour without modifying the underlying source code. Following the open/closed principle provides many quality-related benefits as the original code never changes.

### Benefits

- Follows the open/closed principle
- Allows a new operation to be defined without changing the implementation of the class
- A visitor object can have state

### Drawbacks

- If a new visitable object is added then all visitors need to be modified



## Double dispatch

The visitor pattern is one way of implementing *double dispatch* in a language that doesn't support it. Double dispatch is a method of dispatching a function call to a particular concrete function based on two object parameters. To understand this better, it's basically a method of implementing the following:

    (A, B).func();

It may seem like function overloading can accomplish this same task, and in some cases that is true. However, properly implementing double dispatch solves a problem that can occur due to the compile-time evaluation of calls. For example, consider this code:

<!--prettify lang=java-->
    class Paint { }
    class RedPaint extends Paint { }

    class Car {
        public void paint(Paint paint) {
            System.out.println("Car painted");
        }

        public void paint(RedPaint paint) {
            System.out.println("Car painted red");
        }
    }

    public class Program {
        public static void main(String[] args) {
            Car car = new Car();
            Paint paint = new Paint();
            Paint redPaint = new RedPaint();

            car.paint(paint);
            car.paint(redPaint);
        }
    }

The output for the above program is not as expected:

> Car painted
>
> Car painted

The second line should say `Car painted red` since `RedPaint` is used but instead uses the implementation of its super type `Paint`. This is because the function overloading on `Car.paint(...)` is done at compile-time and uses the `redPaint` variable's boxed type `Paint`.

To solve this problem the visitor pattern can be applied which has a single method `Car.paint(Paint)` that calls the `Paint.paint(Car)` interface. The implementation chosen depends on what the type is at runtime, not compile-time.

<!--prettify lang=java-->
    class Car {
        public void paint(Paint paint) {
            paint.paint(this);
        }
    }

    class Paint {
        public void paint(Car car) {
            System.out.println("Car painted");
        }
    }

    class RedPaint extends Paint {
        public void paint(Car car) {
            System.out.println("Car painted red");
        }
    }

Producing the expected output:

> Car painted red
>
> FastCar painted red

This works because instead of relying on function overloading on `Car.paint(Paint)` to dispatch the call which is evaluated statically at *compile-time*, the function `Paint.paint(Car)` is used which is virtual and evaluated dynamically at *runtime*.



## UML diagram

{% include post-image.html class="full-width stretch" alt="Visitor UML diagram" src="/images/2014/01/06/visitor-uml.svg" %}



## Code

[View on GitHub][1]

<!--prettify lang=java-->
    public interface ElementInterface {
        public void accept(VisitorInterface visitor);
    }

    public class ConcreteElementA implements ElementInterface {
        public void accept(VisitorInterface visitor) {
            visitor.visit(this);
        }
    }

    public class ConcreteElementB implements ElementInterface {
        public void accept(VisitorInterface visitor) {
            visitor.visit(this);
        }
    }

    public interface VisitorInterface {
        public void visit(ConcreteElementA element);
        public void visit(ConcreteElementB element);
    }

    public class ConcreteVisitor1 implements VisitorInterface {
        public void visit(ConcreteElementA element) {
            System.out.print("1 visits A");
        }

        public void visit(ConcreteElementB element) {
            System.out.print("1 visits B");
        }
    }

    public class ConcreteVisitor2 implements VisitorInterface {
        public void visit(ConcreteElementA element) {
            System.out.print("2 visits A");
        }

        public void visit(ConcreteElementB element) {
            System.out.print("2 visits B");
        }
    }



## Usage examples

Here are a few example of where you could use the visitor pattern:

* A 'screen painter' object (the visitor) that paints several widgets to the screen (the elements).
* A HTML parser (visitor) that parses HTML nodes (the elements).



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/visitor
