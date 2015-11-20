console.log("LOADED TABI");

window.tobitabi = {
  gen_tripcodes: function(els) {
    _.each(els, function(authorEl) {
      authorEl = $(authorEl);

      if (authorEl.data("tripcode")) {
        return;
      }


      var authorText = authorEl.text();
      authorEl.addClass("tobitabitrip");
      authorEl.attr("title", authorText);
      authorEl.empty(); 
      var tripcode = window.md5(authorText);
      $(authorEl).data("tripcode", tripcode);
      window.tripcode.gen_tripcode(authorEl);

    });
  }, 
  set_selector: function(selector) {
    console.log("SETTING SELECTOR", selector);
    function replace_users_with_trips() {
      var authors = $(selector);

      console.log("REPLACING ELS", authors.length);
      window.tobitabi.gen_tripcodes(authors);
    }

    replace_users_with_trips = _.throttle(replace_users_with_trips, 100);

    var last_length = -1;
    setInterval(function() {
      var authors = $(selector);
      if (authors.length !== last_length) {
        last_length = authors.length;
        replace_users_with_trips();
      }
    }, 100);


    replace_users_with_trips();


  }
};
