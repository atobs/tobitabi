function yc_news() {
  return _.filter($("a"), function(a) {
    if (!$(a).attr("href")) {
      return;
    }
    return $(a).attr("href").indexOf("user") !== -1;
  });
}


var SITE_LOOKUP = {
  ".*\.?8ch\.net": ".poster_id",
  ".*\.?euphoria\.io" : ".nick, .mention-nick",
  ".*\.?github\.com" : "[data-ga-click ~= 'target:actor'], .user-mention",
  ".*\.?reddit\.com" : ".author",
  ".*\.?news\.ycombinator\.com" : {
    selector: yc_news,
    cb: function(els) {
      _.each(els, function(el) {
        var scoreEl = $(el).closest(".subtext").find(".score");
        $(el).after(scoreEl);
        
        $(el).css({
          "margin-right" : "5px"
        });
      });
    }
  },
  ".*\.?youtube\.com" : ".at_author, .user-name",
  ".*\.?facebook\.com" : {
    selector: "[data-hovercard], .UFIReplySocialSentenceLinkText span:first-child, #fbNotificationsFlyout .fwb, .fbRemindersTitle",
    cb: function(els) {
      $(".UFIImageBlockImage img").hide();
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
  if (window.location.hostname.match(reg)) {
    // check if we are going to actually change this page by asking our parent script...]
    chrome.runtime.sendMessage({atobify: key}, function(response) {
      if (response.atobify) {
        if (_.isObject(data)) {
          window.tobitabi.set_selector(data.selector, data.cb);
        } else {
          window.tobitabi.set_selector(data);
        }
      }
    });
    
  }
});

window.tobitabi_sites = SITE_LOOKUP;
