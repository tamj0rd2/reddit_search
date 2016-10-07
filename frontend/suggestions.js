$(document).ready(function () {
  'use strict';

  function showSuggestions(result) {
    var subs = result.subs;

    function feedTooLong(suggestions) {
      // returns true if the sub_feed is too long
      return suggestions.length >= 10;
    }

    function setSuggestions(suggestions) {
      // adds the suggestions to the sub_feed
      for (var i = 0; i < suggestions.length; i++) {
        $('#sub_feed').append('<option value="' + suggestions[i] + '">');
      }
    }

    // get rid of the old suggestions so that we have room to add new ones
    $('#sub_feed').empty();

    // keep the lowercase representation so that we can compare the top
    // subreddit names to it later
    var query = $('#subreddit').val().toLowerCase();
    if (query.length < 3) {
      // there's no point offering suggestions for such a short subreddit name
      return;
    }

    var suggestions = [];
    for (var i = 0; i < subs.length; i++) {
      if (feedTooLong(suggestions)) {
        // having too many suggestions gives a bad user experience
        break;
      }
      // make the subreddit name lowercase so we can compare it with
      // the user's query
      if (subs[i].toLowerCase().startsWith(query)) {
        if ($.inArray(subs[i], suggestions) === -1) {
          // store suggestions in a variable to prevent duplicates
          // from being added
          suggestions.push(subs[i]);
        }
      }
    }
    setSuggestions(suggestions);
  }

  $('#subreddit').on('input', function getSubs() {
    chrome.storage.local.get('subs', showSuggestions);
  });
});
