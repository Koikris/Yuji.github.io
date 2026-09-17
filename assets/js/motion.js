(function () {
  var root = document.documentElement;
  var nodes = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("has-js");

  function showAll() {
    Array.prototype.forEach.call(nodes, function (node) {
      node.classList.add("is-in");
    });
  }

  if (reduce || !nodes.length || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  Array.prototype.forEach.call(nodes, function (node) {
    observer.observe(node);
  });
})();
