$(document).ready(function () {
  'use strict';

  function cleanInput() {
    // returns true if the subreddit is only alphanumeric with underscores
    if (/[a-zA-Z0-9_]+$/g.test($('#subreddit').val())) {
      return true;
    }
    // returns false if the user has typed in a special character and also
    // removes all special characters
    var newVal = $('#subreddit').val().replace(/[^a-zA-Z0-9_]+/g, '');
    $('#subreddit').val(newVal);
    return false;
  }

  $('#subreddit').on('input', function getSubs() {
    cleanInput();
  });

  chrome.storage.local.get('subs', function (result) {
    $('#subreddit').typeahead({
      source: result.subs,
      items: 5,
      minLength: 3
    });
  });
});
