(function () {
  function setup() {
    if (MathJax) {
      MathJax.Hub.Config({
        messageStyle: "none",
        tex2jax: {
          inlineMath: [['$','$'], ['\\(','\\)']],
          processEscapes: true
        },
        "HTML-CSS": {
          scale: 100,
          styles: {
            ".MathJax_Display": {
              "font-size": "1.25em"
            }
          }
        }
      });
    } else {
      // Retry every .5s
      setTimeout(setup, 500);
    }
  }
})();