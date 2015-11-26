
var SITE_LOOKUP = {
  ".*\.?8ch\.net": ".poster_id",
  ".*\.?euphoria\.io" : ".nick, .mention-nick",
  ".*\.?github\.com" : "[data-ga-click ~= 'target:actor'], .user-mention",
  ".*\.?reddit\.com" : ".author",
  ".*\.?stackexchange\.com" : ".user-details a, .comment-user",
  ".*\.?stackoverflow\.com" : ".user-details a, .comment-user",
  ".*\.?news\.ycombinator\.com" : {
    selector: function yc_news() {
      return _.filter($("a"), function(a) {
        if (!$(a).attr("href")) {
          return;
        }
        return $(a).attr("href").indexOf("user") !== -1;
      });
    },
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

        $(el).closest(".anchorContainer").find(".img").hide();

      });
    }
  }

};

window.tobitabi_sites = SITE_LOOKUP;
