---
layout      : post
title       : Decorator design pattern
tags        : [Design pattern, Java, Software engineering, Structural design pattern, UML]
socialimage : /images/2012/11/04/preview.png
primarytag  : Design pattern
intro       : The decorator pattern allows behaviour to be added to an existing object at runtime. This is achieved by wrapping the object (the component) in another class (the decorator).
---

Like the [delegation pattern][1], the decorator pattern is similar to inheritance as it extends the functionality of a particular class. The primary difference between decorator and delegation is that the decorator pattern is more flexible, allowing multiple decorators to point to a single component at one time.

Reducing the complexity of an inheritance tree is one of the benefits to this pattern, imagine for example an application that prints a photo with an optional filter, an optional border and an optional rotation. This can be achieved in the following ways:

- A single class with a lot of code; `Photo`
- A class for each combination of options; `Photo`, `BorderPhoto`, `FilterPhoto`, `RotatePhoto`, `BorderFilterPhoto`, `FilterRotatePhoto`, `BorderRotatePhoto`, `BorderFilterRotatePhoto`
- A class with optional decorators; `Photo`, `PhotoFilterDecorator`, `PhotoBorderDecorator`, `PhotoRotateDecorator`

The decorator pattern is of great use when implementing the open/closed principle, as described below:

> software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification
>
> <footer><cite>Object-Oriented Software Construction</cite>, Bertrand Meyer</footer>

So once an application has been built, it should only be extended, not *modified*. It is particularly useful in a production environment as it reduces the amount of regression testing required. The decorator pattern is great here as it's simple to extend existing components in a completely modular way.

**Benefits**

- Add behaviour to a component dynamically at runtime
- Attach multiple decorators to a single component at one time
- Completely modular, we don't need to touch the existing component
- Can reduce the amount subclasses of a class

**Drawbacks**

- Overuse of the decorator pattern can lead to very abstract and complex code



## UML diagram

{% include post-image.html class="center-aligned" alt="Decorator UML diagram" src="/images/2012/11/04/decorator-uml.svg" %}



## Code example

[View on GitHub][2]

<!--prettify lang=java-->
    public interface IComponent {
        public void operation();
    }


    public class ConcreteComponent implements IComponent {
        public void operation() {
            // Do something normally
        }
    }


    public abstract class Decorator implements IComponent {
        private IComponent component;

        public Decorator(IComponent component) {
            this.component = component;
        }

        protected IComponent getComponent() {
            return component;
        }
    }


    public class ConcreteDecoratorA extends Decorator {
        public ConcreteDecoratorA(IComponent component) {
            super(component);
        }

        public void operation() {
            // Do something differently
        }
    }


    public class ConcreteDecoratorB extends Decorator {
        public ConcreteDecoratorB(IComponent component) {
            super(component);
        }

        public void operation() {
            // Do something else differently
        }
    }



## Usage examples

Here are a few examples where you could use the decorator pattern:

- A photo (component) can be printed normally (concrete component), with a border (decorator), with a filter (decorator) or with a rotation (decorator).
- An employee (component) can have their name printed with no title (concrete component), as a developer (decorator) or as a manager (decorator).
- An email's (component) contents can be constructed normally (concrete component), or with an optional header/footer describing the security level (decorators) or the organisation (decorator).



[1]: {{site.baseurl}}/2012/07/design-patterns-delegation-pattern.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/decorator

[Decorator UML diagram]: https://googledrive.com/host/0B-wUQaw640vCVkt4d1duOWMzWVU
