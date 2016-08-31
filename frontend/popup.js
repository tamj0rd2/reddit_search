/*jslint browser: true indent:2 maxlen: 80*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  'use strict';

  function createSearchUrl() {
    var url, subreddit;
    url = 'https://www.google.com/search?q=site:www.reddit.com/';
    subreddit = $('#subreddit').val();

    if (subreddit) {
      url += 'r/' + subreddit;
    }
    url += '+' + $('#search_query').val();
    return url;
  }

  function search() {
    var url = createSearchUrl();
    window.open(url, '_blank').focus();
  }

  $('button').click(function () {
    if ($('#search_query').val()) {
      /* if search_query has a value, perform the search */
      search();
    } else {
      /* otherwise show warnings */
      $('#query_group').addClass('has-error');
      $('#help1').removeClass('vishid');
      return false;
    }
  });
});
