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

  }

  $('button').click(function () {

  });
});
