$(document).ready(function(){

  var url, win;

  var focusFunction = function(){
      //Declaring a function that will be called on search button click — it opens the url in a new tab and switches over to it
      win = window.open(url, '_blank');
      win.focus();
  }

  var removeWarn = function(){
    //Declaring a function to be used when the 'invalid form' warning should be removed.
    $('.query_group').removeClass('has-error');
    $('small').hide();
  };

  $('button').on('click', function(){
    //The user should see a warning if they leave the search query are empty.
    if(!$('#search_query').val()){
      $('.query_group').addClass('has-error');
      $('small').show();
    }
    //When the user leaves out the subreddit area, the Google search will allow the user not to use one.
    else if (!$('#subreddit').val()){
      url = 'https://www.google.com' + '/#q=site:www.reddit.com ' + $('#search_query').val();
      focusFunction();
      removeWarn();
    }
    //When both areas are filled in, Google searches through a specific subreddit with a specific query.
    else{
      url = 'https://www.google.com' + '/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val();
      focusFunction();
      removeWarn();
    }
    return false;
  });

});
