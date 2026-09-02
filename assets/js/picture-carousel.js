(function () {
  var root = document.querySelector("[data-picture-carousel]");
  if (!root) return;

  var images = Array.prototype.slice.call(root.querySelectorAll(".picture-carousel__image"));
  var dots = Array.prototype.slice.call(root.querySelectorAll(".picture-carousel__dot"));
  var prev = root.querySelector(".picture-carousel__btn--prev");
  var next = root.querySelector(".picture-carousel__btn--next");
  var total = images.length;
  var current = 0;
  var startX = 0;

  if (total < 2) return;

  function show(index) {
    current = (index + total) % total;
    images.forEach(function (img, i) {
      img.classList.toggle("is-active", i === current);
    });
    dots.forEach(function (dot, i) {
      var active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  var stage = root.querySelector(".picture-carousel__stage");
  if (stage) {
    stage.style.cursor = "pointer";
    stage.addEventListener("click", function () { show(current + 1); });
  }

  if (prev) prev.addEventListener("click", function () { show(current - 1); });
  if (next) next.addEventListener("click", function () { show(current + 1); });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      show(parseInt(dot.getAttribute("data-index"), 10));
    });
  });

  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  root.setAttribute("tabindex", "0");

  root.addEventListener("touchstart", function (event) {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener("touchend", function (event) {
    var delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) < 40) return;
    show(current + (delta < 0 ? 1 : -1));
  }, { passive: true });
})();
