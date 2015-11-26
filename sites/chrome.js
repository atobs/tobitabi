
_.each(window.tobitabi_sites, function(data, key) {
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

