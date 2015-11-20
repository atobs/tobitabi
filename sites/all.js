var SITE_LOOKUP = {
  ".*\.?8ch\.net": ".poster_id",
  ".*\.?euphoria\.io" : ".nick, .mention-nick",
  ".*\.?github\.com" : "[data-ga-click ~= 'target:actor'], .user-mention",
  ".*\.?reddit\.com" : ".author",
  ".*\.?youtube\.com" : ".at_author, .user-name",
  ".*\.?facebook\.com" : {
    selector: "[data-hovercard]",
    cb: function(els) {
      $(els).css("display", "block");
      _.each(els, function(el) {
        if (el.hasClass("img")) {
          el.css("width", "50px");
        }
      });
    }
  }

};


_.each(SITE_LOOKUP, function(data, key) {
  var reg = new RegExp(key);
  if (_.isObject(data)) {
    if (window.location.hostname.match(reg)) {
      window.tobitabi.set_selector(data.selector, data.cb);
    }

  } else {
    if (window.location.hostname.match(reg)) {
      window.tobitabi.set_selector(data);
    }
  }
});
