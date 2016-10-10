$(document).ready(function searchAction() {
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

  function search(tabOption) {
    var url = createSearchUrl();
    if (tabOption === 'cur_tab') {
      chrome.tabs.update({url: url});
      window.close();
    } else {
      chrome.tabs.create({url: url});
    }
  }

  function addSubToStorage() {
    chrome.storage.local.get('subs', function updateStorage(result) {
      var subs = result.subs;
      subs.push($('#subreddit').val());
      chrome.storage.local.set({'subs': subs});
    });
  }

  $('button').click(function () {
    if ($('#search_query').val()) {
      /* if there was no suggestion for the subreddit, add it to the storage */
      // TODO: needs fix. sub_feed no longer exists in the html
      if ($('#sub_feed option').length === 0 && $('#subreddit').val()) {
        addSubToStorage();
      }
      var tabOption = $(this).val();
      search(tabOption);
    } else {
      /* otherwise show warnings */
      $('#query_group').addClass('has-error');
      $('#help1').removeClass('vishid');
      return false;
    }
  });
});

$(document).ready(function defaultSearchOption() {
  'use strict';

  function setDefaultBtn(btnValue) {
    /* set the default search option to whichever button's value === btnValue */
    var defaultBtn = $('button[value="' + btnValue + '"]');
    var otherBtn = $('button[value!="' + btnValue + '"]');

    $(defaultBtn)
      .addClass('btn-primary')
      .removeClass('btn-default')
      .prop('type', 'submit');
    $(otherBtn)
      .addClass('btn-default')
      .removeClass('btn-primary')
      .prop('type', 'button');
  }

  chrome.storage.local.get('defaultTab', function initDOM(result) {
    setDefaultBtn(result.defaultTab);
  });

  $('a').click(function () {
    chrome.storage.local.get('defaultTab', function switchDefaultBtn(result) {
      var newDefault;
      /* figure out which button will need to be our new default button */
      if (result.defaultTab === 'cur_tab') {
        newDefault = 'new_tab';
      } else {
        newDefault = 'cur_tab';
      }
      setDefaultBtn(newDefault);
      chrome.storage.local.set({'defaultTab': newDefault});
    });
  });
});
