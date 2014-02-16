---
layout      : post
title       : Factory method design pattern
tags        : [Creational design pattern, Design pattern, Java, Software engineering, UML]
socialimage : /images/2012/12/01/preview.png
primarytag  : Design pattern
intro       : The factory method design pattern attempts to implement the concept of real-world factories within your program. Instead of the object creating itself, the task of creation is given to a 'factory' object.
---

Factory method effectively encapsulates the creation of objects within another class, one benefit of this is that it allows access to resources or objects that may not be available within the class constructor. For example a UI framework may have a `createWidget` factory method, this method not only returns the new object but also adds it to the list of widgets to be drawn and updated. This is one of the most common usage examples for factory method.

**Benefits**

- Provides a centralised location for pre- or post-constructor logic
- Allows access to resources that may not be available within the class being constructed
- Encapsulates the creation of objects

**Drawbacks**

- A factory can only be used for a single family of objects
- Can potentially overcomplicate a solution
- Factory methods are not as easily identified as constructors are



## Variants

The factory method has a few variants and they are all often referred to as simply 'factory method'.

### Simple factory

The 'simple factory' is one of the variants of the factory method pattern in which instead of the factory method implementing an interface, it takes parameter(s) and the factory determines what type of class to return. An example usage of this would be a factory that takes a file as a parameter and creates different objects based on the file type/extension of the parameter provided.

**Benefits**

- Very simple
- The logic to determine what type of object to create is in a very logical location

### Private constructor

Another variant places the factory method inside the object that it is creating. This effectively allows us to name constructors. The creation methods are typically static and the real constructors are private to ensure that objects are only created via the creation methods. As an example, imagine an `Angle` class which can be created using a `FromDegrees` method and a `FromRadians` method.

**Benefits**

- Allows naming of constructors
- Ensures that the real constructors will only be called inside the class

**Drawbacks**

- The class cannot be extended due to the private constructor



## UML diagram

{% include post-image.html class="full-width stretch" alt="Factory method UML diagram" src="/images/2012/12/01/factory-method-uml.svg" %}



## Code example

[View on GitHub][1]

<!--prettify lang=java-->
    public class Product {
        // ...
    }

    public class ConcreteProduct1 extends Product {
        // ...
    }

    public class ConcreteProduct2 extends Product {
        // ...
    }

    public interface ProductFactory {
        Product makeProduct();
    }

    public class Product1Factory implements ProductFactory {
        public Product makeProduct() {
            return new ConcreteProduct1();
        }
    }

    public class Product2Factory implements ProductFactory {
        public Product makeProduct() {
            return new ConcreteProduct2();
        }
    }



## Usage examples

Here are a few example uses of the factory method pattern.

- You can create widgets in a UI framework using the `createWidget` factory method.
- A database can be either a SQL or Oracle database.



[1]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/factory-method

[Factory method UML diagram]: https://googledrive.com/host/0B-wUQaw640vCMjBRbXE4a2ZuQnM
