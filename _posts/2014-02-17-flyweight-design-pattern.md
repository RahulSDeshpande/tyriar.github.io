---
layout      : post
staging     : 1
title       : Flyweight design pattern
tags        : [Creational design pattern, Design pattern, Software engineering, UML]
preview     : /images/2014/02/17/preview.svg
socialimage : /images/2014/02/17/preview.png
primarytag  : Design pattern
intro       : The flyweight design pattern aims to minimise the memory usage of a collection of items by promoting re-use and deferring initialisation.
---

To achieve this it uses a "factory" that utilises [lazy loading][1] to initialise its items only at the point in which they are required. A reference to the item is then cached by the factory in a hash map for fast retrieval at a later time.

### Benefits

- Reduces overall memory usage particularly when not all items are used or when items are used by multiple consumers
- Reduces initial strain on the system caused by initialising all the objects in the collection

### Drawbacks

- Can cause bottlenecks that may be better off happening during the initial load if a significant number of items is required at once



## Intrinsic vs extrinsic state

A flyweight object is different from a regular object by the categorisation of its data into intrinsic and extrinsic state. Intrinsic which the flyweight tracks and extrinsic which some other object tracks, the idea being that the memory it takes to store the extrinsic state need not be duplicated for every object.

An good example of this categorisation is a graphical component such as a tooltip, whose intrinsic data is the text to be displayed and the extrinsic data is the \\(x\\) and \\(y\\) coordinates on the screen.



## UML diagram

{% include post-image.html class="full-width stretch" alt="Flyweight UML diagram" src="/images/2014/02/17/flyweight-uml.svg" %}



## Code

[View on GitHub][2]

<!--prettify lang=java-->
    public interface Flyweight {
        public void operation(int extrinsicState);
    }

<!--prettify lang=java-->
    public class ConcreteFlyweight implements Flyweight {
        private int intrinsicState;

        public ConcreteFlyweight(int intrinsicState) {
            this.intrinsicState = intrinsicState;
        }

        public void operation(int extrinsicState) {
            System.out.print("Intrinsic: " + intrinsicState + ", " +
                             "Extrinsic: " + extrinsicState);
        }
    }

<!--prettify lang=java-->
    public class FlyweightFactory {
        private Map<Integer, Flyweight> flyweights = new HashMap<Integer, Flyweight>();

        public Flyweight get(Integer key) {
            Flyweight flyweight = flyweights.get(key);
            
            if (flyweight == null) {
                flyweight = new ConcreteFlyweight(key);
                flyweights.put(key, flyweight);
            }
            
            return flyweight;
        }
    }



## Usage examples

- A classic example of the flyweight pattern is the graphical representation of a character in a text editor. Instead of loading the font glyph and other data every time the character is used, it is loaded into memory once and shared between consumers.
- Java's `Integer` object keeps a cache of `Integer` objects that are boxed around the `int` primitive using the flyweight pattern.



[1]: {{ site.baseurl }}/2012/04/design-patterns-introduction-and-lazy.html
[2]: https://github.com/Tyriar/growing-with-the-web/tree/master/design-patterns/flyweight
