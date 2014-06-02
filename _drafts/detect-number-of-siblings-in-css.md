I came across a great CSS technique that was originally developed by [André Luís][1] and then refined by [Lea Verou][2], applying a style when the number of siblings is a particular number.

This has a bunch of potential applications, a particularly nice one is styling a series of siblings to fill the width of the container. Here is an example that lays out `li`s using `float:left` and a [pseudo-element clearfix][3] to clear the floating elements.

<!--prettify lang=css-->
	/* one item */
	li:first-child:nth-last-child(1) {
		width: 100%;
	}

	/* two items */
	li:first-child:nth-last-child(2),
	li:first-child:nth-last-child(2) ~ li {
		width: 50%;
	}

	/* three items */
	li:first-child:nth-last-child(3),
	li:first-child:nth-last-child(3) ~ li {
		width: 33.3333%;
	}

	/* four items */
	li:first-child:nth-last-child(4),
	li:first-child:nth-last-child(4) ~ li {
		width: 25%;
	}

It works by selecting the first child, then the <code>n</code>th last child which will only exist if there is at least <code>n</code> siblings. The order in which the rules are defined then applies the correct rule(s) to the siblings.

<p data-height="268" data-theme-id="2513" data-slug-hash="qxHgE" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/Tyriar/pen/qxHgE'>Detect number of siblings with CSS</a> by Daniel Imms (<a href='http://codepen.io/Tyriar'>@Tyriar</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async="async" src="//codepen.io/assets/embed/ei.js"></script>

If you're using Sass this technique can be applied using a mixin for convenience.

<!--prettify lang=css-->
    @mixin space-out($min, $max) {
      @for $i from $min through $max {
        &:first-child:last-child(#{$i}),
        &:first-child:last-child(#{$i}) ~ & {
          width: 1 / $i * 100%;
        }
      }
    }

    li {
      @include space-out(1, 4);
    }

LESS is a little trickier as [looping][4] isn't as intuitive but it's doable as well.

<!--prettify lang=css-->
    .space-out(@min, @max) {
      .space-out-loop(@i) when (@i > 0) {
        .space-out-loop(@i - 1);
        &:first-child:last-child(@{i}),
        &:first-child:last-child(@{i}) ~ & {
          width: 1 / @i * 100%;
        }
      }
      .space-out-loop(@max);
    }

    li {
      .space-out(1, 4);
    }

[1]: http://andr3.net/blog/post/142
[2]: http://lea.verou.me/2011/01/styling-children-based-on-their-number-with-css3/
[3]: http://www.growingwiththeweb.com/2013/03/a-clearfix-without-additional-markup.html
[4]: http://www.growingwiththeweb.com/2014/03/implementing-loops-in-less.html
