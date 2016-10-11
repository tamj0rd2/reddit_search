chrome.runtime.onInstalled.addListener(function (details) {
  'use strict';

  function caseInsensitiveSort(array) {
    /* Sort an array, ignoring the case of the items */
    return array.sort(function (a, b) {
      var atemp = a.toLowerCase(), btemp = b.toLowerCase();
      return atemp > btemp ? 1 : atemp < btemp ? -1 : 0;
    });
  }

  function initDefaultTab() {
    chrome.storage.local.set({'defaultTab': 'new_tab'});
  }

  function initSubs(subs) {
    subs = caseInsensitiveSort(subs);
    chrome.storage.local.set({'subs': subs});
  }

  if (details.reason === 'install') {
    /* Initialises the chrome storage for the extension */
    $.getJSON('backend/topsubreddits.json', initSubs);
    initDefaultTab();
  }
});

chrome.runtime.onMessage.addListener(
  function (message) {
    'use strict';

    function caseInsensitiveSort(array) {
      /* Sort an array, ignoring the case of the items */
      return array.sort(function (a, b) {
        var atemp = a.toLowerCase(), btemp = b.toLowerCase();
        return atemp > btemp ? 1 : atemp < btemp ? -1 : 0;
      });
    }

    if (message.msgType === 'add_sub') {
      chrome.storage.local.get('subs', function addASub(result) {
        var subs = result.subs;
        subs.push(message.sub);
        subs = caseInsensitiveSort(subs);
        chrome.storage.local.set({'subs': subs});
      });
    }
  }
);
