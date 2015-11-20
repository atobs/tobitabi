window.tobitabi.set_selector("[data-hovercard]", function(els) {
  $(els).css("display", "block");
  _.each(els, function(el) {
    if (el.hasClass("img")) {
      el.css("width", "50px");
    }
  });

});

