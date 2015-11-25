window.tobitabi = {
  gen_tripcodes: function(els) {
    var genned = [];
    _.each(els, function(authorEl) {
      authorEl = $(authorEl);

      if (authorEl.data("tripcode")) {
        return;
      }

      genned.push(authorEl);


      var authorText = authorEl.text();

      if (!authorText) {
        authorEl.hide();
      }

      // everyone loves those mentions...
      authorText = authorText.replace(/@/g, "");
      authorText = authorText.replace(/\/u\//g, "");


      authorEl.addClass("tobitabitrip");
      authorEl.attr("title", authorText);
      authorEl.empty(); 
      var tripcode = window.md5(authorText);
      $(authorEl).data("tripcode", tripcode);
      window.tripcode.gen_tripcode(authorEl);

    });

    return genned;
  }, 
  set_selector: function(selector, fixup_cb) {
    function get_selected_elements() {

      if (_.isFunction(selector)) {
        return selector();
      }

      return $(selector);
    }
    function replace_users_with_trips() {
      var authors = get_selected_elements();

      var genned = window.tobitabi.gen_tripcodes(authors);
      fixup_cb && fixup_cb(genned);
    }

    replace_users_with_trips = _.throttle(replace_users_with_trips, 100);

    var last_length = -1;
    setInterval(function() {
      var authors = get_selected_elements();
      var tripped_authors = _.filter(authors, function(f) {
        return !!$(f).data("tripcode");
      });

      if (authors.length !== last_length || tripped_authors.length != authors.length) {
        last_length = authors.length;
        replace_users_with_trips();
      }
    }, 100);


    replace_users_with_trips();
  }
};
