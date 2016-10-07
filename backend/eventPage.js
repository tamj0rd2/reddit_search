chrome.runtime.onInstalled.addListener(function (details) {
  'use strict';

  function caseInsensitiveSort(array) {
    /* Sort an array, ignoring the case of the items */
    return array.sort(function (a, b) {
      var atemp = a.toLowerCase(), btemp = b.toLowerCase();
      return atemp > btemp ? 1 : atemp < btemp ? -1 : 0;
    });
  }

  if (details.reason === 'install') {
    /* Initialises the chrome storage for the extension */
    $.getJSON('backend/topsubreddits.json', function updateStorage(subs) {
      chrome.storage.local.remove('subs');
      subs = caseInsensitiveSort(subs);
      chrome.storage.local.set({'subs': subs});
    });
  }
});
