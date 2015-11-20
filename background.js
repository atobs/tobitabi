// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var CUR_HOSTNAME;
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
// If the letter 'g' is found in the tab's URL...
  _.each(window.tobitabi_sites, function(selector, rege) {
    var re = new RegExp(rege);
    if (tab.url.match(re)) {
      // ... show the page action.
      chrome.pageAction.show(tabId);
      CUR_HOSTNAME = rege;
      chrome.storage.local.get(CUR_HOSTNAME, function(res) {
        TO_TOB[CUR_HOSTNAME] = res[CUR_HOSTNAME];
      });

    }
  });
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);


var TO_TOB = {};
chrome.pageAction.onClicked.addListener(function() {
  chrome.storage.local.get(CUR_HOSTNAME, function(res) {
    TO_TOB[CUR_HOSTNAME] = !res[CUR_HOSTNAME];
  
    var options = {};
    options[CUR_HOSTNAME] = TO_TOB[CUR_HOSTNAME];
    chrome.storage.local.set(options, function() {
      chrome.tabs.reload();
    });
  });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      sendResponse({atobify: TO_TOB[CUR_HOSTNAME]});
    });

