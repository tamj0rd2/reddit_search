$(document).ready(function(){

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
      return false;
    }
    //When the user leaves out the subreddit area, the Google search will allow the user not to use one
    else if (!$('#subreddit').val()){
      window.location.href = 'https://www.google.com' + '/#q=site:www.reddit.com ' + $('#search_query').val();
      removeWarn();
    }
    //When both areas are filled in, Google searches through a specific subreddit with a specific query
    else{
      window.location.href = 'https://www.google.com' + '/#q=site:www.reddit.com%2F' + $('#subreddit').val() + '+' + $('#search_query').val();
      removeWarn();
    }
  });
});
