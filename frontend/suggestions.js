/*jslint browser: true plusplus: true indent:2 maxlen: 80*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  'use strict';

  function feedTooLong() {
    // returns true if the sub_feed is too long
    return $('#sub_feed option').length > 10;
  }

  function isValidInput(e) {
    // ensures that the escape key can be used to close the suggestions list
    if (e.key === "Escape") {
      return false;
    }
    // filters out characters such as ArrowUp, ArrowDown etc so that the
    // arrow keys can be used to scroll through the suggestions
    return e.keyIdentifier.startsWith("U+");
  }

  function updateSuggestions(suggestions) {
    for (var i = 0; i < suggestions.length; i++) {
      $('#sub_feed').append('<option value="' + suggestions[i] + '">');
    }
  }

  function getSuggestions(e) {
    if (isValidInput(e) === false) {
      return;
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

    $.ajax({
      url: '../backend/topsubreddits.json',
      dataType: 'json',
      type: 'GET',
      success: function (json) {
        json.sort(function (a, b) {
          // make the sorting case-insensitive so that suggestions are
          // ordered correctly
          var atemp = a.toLowerCase(), btemp = b.toLowerCase();
          return atemp > btemp ? 1 : atemp < btemp ? -1 : 0;
        });

        var suggestions = [];
        for (var i = 0; i < json.length; i++) {
          if (suggestions.length >= 10) {
            // having too many suggestions gives a bad user experience
            break;
          }
          // make the subreddit name lowercase so we can compare it with
          // the user's query
          if (json[i].toLowerCase().startsWith(query)) {
            if ($.inArray(json[i], suggestions) === -1) {
              // store suggestions in a variable to prevent duplicates
              // from being added
              suggestions.push(json[i]);
            }
          }
        }
        updateSuggestions(suggestions);
      }
    });
  }
  // use JS instead of jQuery so that we can get the event data of the keypress
  var input = document.getElementById("subreddit");
  input.addEventListener('keyup', function (e) {getSuggestions(e); });
});
