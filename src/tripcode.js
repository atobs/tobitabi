"use strict";

// http://stackoverflow.com/a/10075654/442652
function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

// luminance
// 0.2126 R + 0.7152 G + 0.0722 B
//
function colors_to_luminance(colors) {
  return (0.2126*colors[0]) + (0.7152 * colors[1]) + (0.0722 * colors[2]);
}

function get_ints_for_hash(hashed) {
  hashed = hashed || window.md5(hashed);
  var colors = hashed.match(/([\dABCDEF]{6})/ig);

  var hexes = [];
  for (var i = 0; i < 4; i++) {
    var color = parseInt(colors[i], 16);
    var red = (color >> 16) & 255;
    var green = (color >> 8) & 255;
    var blue = color & 255;
    hexes.push([red, green, blue]);
  }

  return hexes;
}

// http://stackoverflow.com/a/10075654/442652
function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function get_colors_for_hash(hashed) {
  hashed = hashed || window.md5(hashed || "");
  var colors = hashed.match(/([\dABCDEF]{6})/ig);

  var hexes = [];
  for (var i = 0; i < 4; i++) {
    var color = parseInt(colors[i], 16);
    var red = (color >> 16) & 255;
    var green = (color >> 8) & 255;
    var blue = color & 255;
    var hex = $.map([red, green, blue], function(c, i) {
      return padDigits(((c >> 4) * 0x10).toString(16), 2);
    }).join('');

    hexes.push(hex);
  }

  return hexes;
}

function gen_tripcode(el) {
  // Now that we have our tripcodes, do other things...
  var colors = get_colors_for_hash($(el).data("tripcode"));
  var div = $(el);
  var has_children = false;

  if (div.children().length > 0) {
    has_children = true;
  }

  _.each(colors, function(color, index) {
    if (!has_children) {
      var colorDiv = $("<div class='tripcolor' />").css({
        backgroundColor: "#" + color,
        display: "inline-block",
        height: "20px",
        width: "25%"
      });
      div.append(colorDiv);
    } else {
      div.each(function(el) {
        var child = $(this.children[index]);
        child.css("backgroundColor", "#" + color);
      });
    }
  });

  $(el).css({
    position: "relative"
  });
}

window.gen_tripcode = gen_tripcode;


window.tripcode = {
  gen_tripcode: gen_tripcode,
  get_colors_for_hash: get_colors_for_hash
};
