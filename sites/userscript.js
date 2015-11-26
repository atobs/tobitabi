_.each(window.tobitabi_sites, function(data, key) {
  var reg = new RegExp(key);
  if (window.location.hostname.match(reg)) {
    // check if we are going to actually change this page by asking our parent script...]
    if (_.isObject(data)) {
      window.tobitabi.set_selector(data.selector, data.cb);
    } else {
      window.tobitabi.set_selector(data);
    }
  }
});

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

