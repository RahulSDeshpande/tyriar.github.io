The flyweight design pattern aims to minimise the memory usage of a collection of items. To achieve this it uses a "factory" that uses [lazy loading][1] to initialise its items only at the time they are required.

### Benefits

- Reduces overall memory usage particularly when not all items are used
- Reduces initial strain on the system caused by initialising all the objects in the collection

### Drawbacks

- Can cause bottlenecks that may be better off on the initial load if a significant number of items is required at once



## Immutability



## Concurrency





## UML diagram

<div class="post-image center-aligned">
	![Flyweight UML diagram]
</div>



## Code



## Usage examples




[1]: http://www.growingwiththeweb.com/2012/04/design-patterns-introduction-and-lazy.html

[Flyweight UML diagram]: #
