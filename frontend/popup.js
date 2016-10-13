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

  function addSubToStorage(sub) {
    /* adds the sub to the chrome storage if it's not already in there */
    var currentSuggestions = $('.typeahead.dropdown-menu')
      // remove the strong tags so that we can find the subreddit in the html
      .html()
      .toLowerCase()
      .replace(/<strong>|<\/strong>/g, '');
    var subToFind = RegExp('>' + sub.toLowerCase() + '<');

    if (subToFind.test(currentSuggestions) === false) {
      // add the sub to chrome storage, since there wasn't a suggestion for it
      chrome.runtime.sendMessage({msgType: 'add_sub', sub: sub});
    }
  }

  $('button').click(function () {
    if ($('#search_query').val()) {
      var sub = $('#subreddit').val();
      if (sub.length > 2) {
        addSubToStorage(sub);
      }
      var tabOption = $(this).val();
      search(tabOption);
    } else {
      /* otherwise show warnings */
      $('#query_group').addClass('has-error');
      $('#help1').show();
      return false;
    }
  });

  $('#help1').hide();

  $('#search_query').on('input', function hideWarnings() {
    $('#help1').fadeOut(200);
    $('#query_group').removeClass('has-error');
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
