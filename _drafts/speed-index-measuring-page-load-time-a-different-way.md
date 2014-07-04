Speed index: measuring page load time a different way

[Chromium, Performance, Speed index, Telemetry]

For a long time, measuring web performance was all about minimising the time it took for various browser events to fire, such as <code>window.onload</code>. But these timings never really captured the whole picture, that's where speed index comes in.

---

[Speed index][8] is a relatively new way of measuring web page performance that was originally developed for [webpagetest.org][1] which focuses on the user. It works by measuring how much of the *above-the-fold* content (the part that is on screen when loaded initially) is visually complete over time until it is 100% complete.

The reason this is great is because it does a far better job at measuring how the user perceives the performance of a page. Take my blog for example, I've spent a long time optimising every part of it to get the speed index as low as possible, but the page can actually take 2-3 seconds to load fully due to MathJAX's numerous requests and work it can do on a page. Speed index largely ignores this because by the time the user has scrolled down to the part of the page where the math is used, it has likely loaded anyway. Optimisations for speed index also typically improve the mobile experience because they're focused on getting something up and usable as soon as possible.



## Calculating speed index

To measure the speed index of a page a video capture needs to be taken of the page load. Each frame is compared against the final loaded frame to determine what percentage complete the frame is.

{% include post-image.html class="full-width stretch" alt="3 frames, 0s is 0% done, 0.5s is 87% done, 1s is 100% done" src="/images/2014///load-progress.png" %}

Plotting the visual progress of a site over time gives a graph something like this.

{% include post-image.html class="full-width stretch" alt="Visual progress plotted, the area under the curve is highlighted" src="/images/2014///plotted-progress.svg" %}

The area under the curve represents how the visual complete progress but since it is unbounded it doesn't make a good score to measure since it will keep increasing. Instead, the speed index is the area *above* the curve which will approach 0 as the page gets faster.

$$\text{Speed index} = \int_0^end 1 - \text{VC}/100$$
$$\text{end} = \text{end time in milliseconds}$$
$$\text{VC} = % \text{visually complete}$$

{% include post-image.html class="full-width stretch" alt="Visual progress plotted, the area above the curve is highlighted" src="/images/2014///plotted-speed-index.svg" %}

### Measuring visual completeness

The simplistic approach to measure visual progress is to compare the pixel at each position with the corresponding pixel in the completed frame, this turns out to have some issues though particularly around new elements triggering a layout that shifts other elements around.

[webpagetest.org][1] measures visual progress by taking a histogram of colours and calculating the difference with the final frame.

(image demonstrating visual completeness?)

#### Frames per second

webpagetest.org captures in 10 frames per seconds currently but that could change in the future, basically the more frames that are measured the more accurate the result will be.

#### Paint events

There is also a more recent method of calculating visual progress by using browser paint events that are emitted via dev tools. This method is only Chromium-specific however so it cannot be applied to all browsers.



## Telemetry

Chromium have developed a testing framework written in Python called [Telemetry][7] that is responsible for generating all the results for the [Chrome Performance Dashboard][4]. It can also be used to run page load tests on URLs of your choosing to generate speed index in addition to over valuable metrics like [navigation timings][6].

### Setting up Chromium

The instructions to get the Chromium source are available on [the Chromium website][5], don't bother trying to get it to build since we're only interested in Telemetry.

### Running Telemetry

Something like this: (confirm with upstream)
./tools/perf/run_measurement --browser=system --use-live-sites --report-speed-index page_cycler http://www.growingwiththeweb.com



## How fast is fast enough?

For this question [Paul Irish][3], a Google Chrome Developer Advocate, [recommends][2] a speed index of under 1000 is sufficient.



## Wrap up

Start tracking the speed index of your web site in addition to other important metrics today with [web page test][1] or [Telemetry][7].


[1]: http://www.webpagetest.org/
[2]: http://timkadlec.com/2014/01/fast-enough/#comment-1200946500
[3]: http://www.paulirish.com/
[4]: https://chromeperf.appspot.com/
[5]: http://www.chromium.org/developers/how-tos/get-the-code
[6]: http://www.w3.org/TR/navigation-timing/
[7]: http://www.chromium.org/developers/telemetry
[8]: https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index
